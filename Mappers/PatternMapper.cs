using System;
using System.Collections.Generic;
using System.Linq;
using camille.DTO;
using camille.Models;

namespace camille.Mappers
{
    public abstract class PatternMapper
    {
        public static ICollection<PatternDTO> Map(ICollection<Pattern> patterns, ICollection<PatternElement> elements,
            ICollection<Tag> tags)
        {
            ICollection<PatternDTO> dtos = new HashSet<PatternDTO>();

            foreach (Pattern pattern in patterns)
            {
                PatternDTO dto = new PatternDTO
                {
                    ID = pattern.ID,
                    DateCreation = pattern.DateCreation,
                    Name = pattern.Name,
                    Elements = Map(elements, pattern.ID),
                    Tags = Map(tags, pattern.ID)
                };

                dtos.Add(dto);
            }

            return dtos;
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
