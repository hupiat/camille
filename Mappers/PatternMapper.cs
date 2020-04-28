using System;
using System.Collections.Generic;
using System.Linq;
using camille.DTO;
using camille.Models;

namespace camille.Mappers
{
    public abstract class PatternMapper
    {
        public static ICollection<PatternDTO> Map(
            ICollection<Pattern> patterns,
            ICollection<PatternElement> elements,
            ICollection<Tag> tags)
        {
            ICollection<PatternDTO> dtos = new HashSet<PatternDTO>();

            foreach (Pattern pattern in patterns)
            {
                dtos.Add(Map(pattern, elements, tags));
            }

            return dtos;
        }

        public static PatternDTO Map(
            Pattern pattern,
            ICollection<PatternElement> elements,
            ICollection<Tag> tags) => new PatternDTO
            {
                ID = pattern.ID,
                DateCreation = pattern.DateCreation,
                Name = pattern.Name,
                Elements = Map(elements, pattern.ID),
                Tags = Map(tags, pattern.ID)
            };

        public static Pattern Map(PatternDTO patternDTO)
        {
            Pattern pattern = new Pattern
            {
                ID = patternDTO.ID,
                Name = patternDTO.Name,
                DateCreation = patternDTO.DateCreation
            };

            foreach (PatternElementDTO element in patternDTO.Elements)
            {
                foreach (int nextId in element.NextElementsIds)
                {
                    pattern.Bonds.Add(new PatternElementBond
                    {
                        Name = element.Name,
                        PatternId = patternDTO.ID,
                        PatternElementId = element.ID,
                        NextPatternElementId = nextId,
                        X = element.X,
                        Y = element.Y
                    });
                }
            }

            foreach (TagDTO tag in patternDTO.Tags)
            {
                pattern.PatternTags.Add(new PatternTag
                {
                    Name = tag.Name,
                    PatternId = pattern.ID,
                    TagId = tag.ID
                });
            }

            return pattern;
        }

        public static ICollection<PatternElementDTO> Map(ICollection<PatternElement> elements, int patternId)
        {
            ICollection<PatternElementDTO> dtos = new HashSet<PatternElementDTO>();

            ICollection<PatternElement> elementsForPattern = elements
                .Where(e => e.Bonds.Any(b => b.PatternId == patternId))
                .ToList();

            foreach (PatternElement element in elementsForPattern)
            {
                PatternElementBond bond = element.Bonds
                    .Where(b => b.PatternElementId == element.ID)
                    .First();

                PatternElementDTO dto = new PatternElementDTO
                {
                    ID = element.ID,
                    DateCreation = element.DateCreation,
                    Name = element.Name,
                    X = bond.X,
                    Y = bond.Y
                };

                dtos.Add(dto);
            }

            // Building sorted elements with bonds

            foreach (int i in Enumerable.Range(0, dtos.Count))
            {
                ICollection<PatternElementBond> bonds = elements.ElementAt(i).Bonds
                    .Where(b => b.PatternId == patternId)
                    .Where(b => b.PatternElementId == elements.ElementAt(i).ID)
                    .ToList();

                ICollection<int> nextIds = new HashSet<int>();

                foreach (PatternElementBond bond in bonds)
                {
                    if (bond.NextPatternElementId != 0)
                    {
                        ICollection<PatternElementDTO> matching = dtos
                            .Where(dto => dto.ID == bond.NextPatternElementId)
                            .ToList();

                        if (matching.Count > 0)
                        {
                            nextIds.Add(matching.First().ID);
                        }
                    }
                }

                dtos.ElementAt(i).NextElementsIds = nextIds;
            }

            return dtos;
        }

        public static ICollection<TagDTO> Map(ICollection<Tag> tags, int patternId)
        {
            ICollection<TagDTO> dtos = new HashSet<TagDTO>();

            ICollection<Tag> tagsForPattern = tags
                .Where(t => t.PatternTags.Any(pt => pt.PatternId == patternId))
                .ToList();

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
