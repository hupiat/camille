using System;
using System.Collections.Generic;
using System.Linq;
using camille.DTO;
using camille.Helpers;
using camille.Models;

namespace camille.Mappers
{
    public abstract class PatternMapper
    {
        public static IEnumerable<PatternDTO> AsPatternsDTOEnumerable(
            ICollection<Pattern> patterns,
            ICollection<PatternElement> elements,
            ICollection<Tag> tags)
        {
            foreach (Pattern pattern in patterns)
            {
                yield return AsPatternDTO(pattern, elements, tags);
            }
        }

        public static PatternDTO AsPatternDTO(
            Pattern pattern,
            ICollection<PatternElement> elements,
            ICollection<Tag> tags) => new PatternDTO
            {
                ID = pattern.ID,
                DateCreation = pattern.DateCreation,
                Name = pattern.Name,
                Elements = AsElementsDTOCollection(elements, pattern.ID),
                Tags = AsTagDTOCollection(tags, pattern.ID)
            };

        public static Pattern AsPattern(PatternDTO patternDTO,
            ICollection<Vector> positions,
            ICollection<PatternElementBond> bonds,
            ICollection<PatternTag> patternTags)
        {
            Pattern pattern = new Pattern
            {
                ID = patternDTO.ID,
                Name = patternDTO.Name,
                DateCreation = patternDTO.DateCreation
            };

            foreach (PatternElementDTO element in patternDTO.Elements)
            {
                foreach (KeyValuePair<int, VectorDTO> next in element.NextElements)
                {
                    Vector position = positions.FirstOrDefault(p =>
                        p.X == element.Position.X &&
                        p.Y == element.Position.Y &&
                        p.Z == element.Position.Z);

                    if (position == null)
                    {
                        position = new Vector
                        {
                            X = element.Position.X,
                            Y = element.Position.Y
                        };
                    }

                    Vector arrowVector = new Vector
                    {
                        X = next.Value.X,
                        Y = next.Value.Y,
                        Z = next.Value.Z
                    };

                    PatternElementBond bond = bonds
                        .FirstOrDefault(b =>
                            b.NameElement == element.Name &&
                            b.PatternID == patternDTO.ID &&
                            b.PatternElementID == element.ID &&
                            b.NextPatternElementID == next.Key &&
                            b.ArrowVector != null &&
                            b.ArrowVector.X == arrowVector.X &&
                            b.ArrowVector.Y == arrowVector.Y &&
                            b.ArrowVector.Z == arrowVector.Z);

                    if (bond == null)
                    {
                        bond = new PatternElementBond
                        {
                            NameElement = element.Name,
                            PatternID = patternDTO.ID,
                            PatternElementID = element.ID,
                            NextPatternElementID = next.Key,
                            ArrowVector = arrowVector,
                            Position = new Vector
                            {
                                X = element.Position.X,
                                Y = element.Position.Y
                            },
                            Size = new Size
                            {
                                Width = element.Size.Width,
                                Height = element.Size.Height
                            }
                        };
                    }

                    pattern.Bonds.Add(bond);
                }
            }

            foreach (TagDTO tag in patternDTO.Tags)
            {
                PatternTag patternTag = patternTags
                    .FirstOrDefault(pt =>
                        pt.NameTag == tag.Name &&
                        pt.PatternID == pattern.ID &&
                        pt.TagID == tag.ID);

                if (patternTag == null)
                {
                    patternTag = new PatternTag
                    {
                        NameTag = tag.Name,
                        PatternID = pattern.ID,
                        TagID = tag.ID
                    };
                }

                pattern.PatternTags.Add(patternTag);
            }

            return pattern;
        }

        private static ICollection<PatternElementDTO> AsElementsDTOCollection(
            ICollection<PatternElement> elements,
            int patternId)
        {
            ICollection<PatternElementDTO> dtos = new HashSet<PatternElementDTO>();

            ICollection<PatternElement> elementsForPattern = CollectionHelper<PatternElement>
                .Where(elements, e => e.Bonds.Any(b => b.PatternID == patternId));

            foreach (PatternElement element in elementsForPattern)
            {
                PatternElementBond bond = element.Bonds.First(b => b.PatternElementID == element.ID);

                PatternElementDTO dto = new PatternElementDTO
                {
                    ID = element.ID,
                    DateCreation = element.DateCreation,
                    Name = element.Name,
                    Position = new VectorDTO
                    {
                        X = bond.Position.X,
                        Y = bond.Position.Y,
                    },
                    Size = new SizeDTO
                    {
                        Width = bond.Size.Width,
                        Height = bond.Size.Height
                    }
                };

                dtos.Add(dto);
            }

            // Sorting elements using bonds

            foreach (int i in Enumerable.Range(0, dtos.Count))
            {
                ICollection<PatternElementBond> bonds = CollectionHelper<PatternElementBond>
                    .Where(elements.ElementAt(i).Bonds,
                        b => b.PatternID == patternId && b.PatternElementID == elements.ElementAt(i).ID);

                Dictionary<int, VectorDTO> nextElements = new Dictionary<int, VectorDTO>(bonds.Count);

                foreach (PatternElementBond bond in bonds)
                {
                    if (bond.NextPatternElementID != null)
                    {
                        PatternElementDTO matching = dtos.FirstOrDefault(dto => dto.ID == bond.NextPatternElementID);

                        if (matching != null)
                        {
                            nextElements.Add(matching.ID, new VectorDTO
                            {
                                X = bond.ArrowVector.X,
                                Y = bond.ArrowVector.Y,
                                Z = bond.ArrowVector.Z
                            });
                        }
                    }
                }

                dtos.ElementAt(i).NextElements = nextElements;
            }

            return dtos;
        }

        private static ICollection<TagDTO> AsTagDTOCollection(ICollection<Tag> tags, int patternId)
        {
            ICollection<TagDTO> dtos = new HashSet<TagDTO>();

            ICollection<Tag> tagsForPattern = CollectionHelper<Tag>
                .Where(tags, t => t.PatternTags.Any(pt => pt.PatternID == patternId));

            foreach (Tag tag in tagsForPattern)
            {
                TagDTO dto = new TagDTO
                {
                    ID = tag.ID,
                    DateCreation = tag.DateCreation,
                    Name = tag.Name
                };

                dtos.Add(dto);
            }

            return dtos;
        }
    }
}
