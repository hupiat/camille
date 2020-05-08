using System;
using System.Collections.Generic;
using camille.Models;

namespace Tests.With
{
    internal abstract class WithModelTest
    {
        protected ICollection<Pattern> patterns;
        protected ICollection<PatternElement> elements;
        protected ICollection<PatternElementBond> bonds;
        protected ICollection<PatternElementPosition> positions;
        protected ICollection<PatternTag> patternTags;
        protected ICollection<Tag> tags;

        public WithModelTest()
        {
            var position = new PatternElementPosition
            {
                X = 100,
                Y = 200
            };

            var bond = new PatternElementBond
            {
                ID = 1,
                NameElement = "Fake element",
                PatternId = 1,
                PatternElementId = 1,
                NextPatternElementId = 2,
                Position = position,
            };

            var patternTag = new PatternTag
            {
                ID = 1,
                NameTag = "Fake tag",
                PatternId = 1,
                TagId = 1
            };

            patterns = new HashSet<Pattern>
            {
                new Pattern
                {
                    ID = 1,
                    Name = "Fake pattern",
                    DateCreation = DateTime.UtcNow,
                    Bonds = new HashSet<PatternElementBond>
                    {
                        bond
                    },
                    PatternTags = new HashSet<PatternTag>
                    {
                        patternTag
                    }
                }
            };

            elements = new HashSet<PatternElement>
            {
                new PatternElement
                {
                    ID = 1,
                    Name = "Fake element",
                    DateCreation = DateTime.UtcNow,
                    Bonds = new HashSet<PatternElementBond>
                    {
                        bond
                    },
                }
            };

            tags = new HashSet<Tag>
            {
                new Tag
                {
                    ID = 1,
                    Name = "Fake tag",
                    DateCreation = DateTime.UtcNow,
                    PatternTags = new HashSet<PatternTag>
                    {
                        patternTag
                    }
                }
            };

            bonds = new HashSet<PatternElementBond> { bond };

            positions = new HashSet<PatternElementPosition> { position };

            patternTags = new HashSet<PatternTag> { patternTag };
        }
    }
}
