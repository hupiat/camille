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
        protected ICollection<Vector> vectors;
        protected ICollection<PatternTag> patternTags;
        protected ICollection<Tag> tags;

        public WithModelTest()
        {
            var vector = new Vector
            {
                X = Vector.MAX_X_PX,
                Y = Vector.MAX_Y_PX
            };

            var arrowVector = new Vector
            {
                X = Vector.MAX_X_PX,
                Y = Vector.MAX_Y_PX,
                Z = 100
            };

            var bond = new PatternElementBond
            {
                ID = 1,
                NameElement = "Fake element",
                PatternID = 1,
                PatternElementID = 1,
                NextPatternElementID = 2,
                Position = vector,
                ArrowVector = arrowVector,
            };

            var otherBond = new PatternElementBond
            {
                ID = 2,
                NameElement = "Fake element 2",
                PatternID = 1,
                PatternElementID = 2,
                Position = vector,
            };

            var patternTag = new PatternTag
            {
                ID = 1,
                NameTag = "Fake tag",
                PatternID = 1,
                TagID = 1
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
                },
                new PatternElement
                {
                    ID = 2,
                    Name = "Fake element 2",
                    DateCreation = DateTime.UtcNow,
                    Bonds = new HashSet<PatternElementBond>
                    {
                        otherBond
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

            vectors = new HashSet<Vector> { vector };

            patternTags = new HashSet<PatternTag> { patternTag };
        }
    }
}
