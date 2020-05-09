using System;
using System.Collections.Generic;
using System.Linq;
using camille.Models;

namespace camille.DAL
{
    public class PatternDataInitializer
    {
        public static int PATTERNS = 100;
        private readonly int MAX_ELEMENTS_BY_PATTERN = 15;

        private readonly ICollection<PatternElement> _elements = new HashSet<PatternElement>();
        private readonly ICollection<Tag> _tags = new HashSet<Tag>();

        public PatternDataInitializer(PatternContext context) => context.Transaction(() =>
        {
            if (!IsFilled())
            {
                FakeData();
                context.PatternElements.AddRange(_elements.ToArray());
                context.Tags.AddRange(_tags.ToArray());
            }

            context.SaveChanges();

            Random rand = new Random();

            foreach (int i in Enumerable.Range(0, PATTERNS))
            {
                Pattern pattern = new Pattern()
                {
                    Name = "Pattern " + i,
                };

                int elementsLength = rand.Next(1, MAX_ELEMENTS_BY_PATTERN);

                foreach (int _ in Enumerable.Range(0, elementsLength))
                {
                    PatternElement element = _elements.ElementAt(rand.Next(0, _elements.Count));
                    PatternElement nextElement = _elements.ElementAt(rand.Next(0, _elements.Count));
                    Vector arrowVector = new Vector
                    {
                        X = rand.Next(0, Vector.MAX_X_PX + 1),
                        Y = rand.Next(0, Vector.MAX_Y_PX + 1),
                        Z = rand.Next(0, 100)
                    };

                    Vector position = new Vector
                    {
                        X = rand.Next(0, Vector.MAX_X_PX + 1),
                        Y = rand.Next(0, Vector.MAX_Y_PX + 1),
                    };

                    Size size = new Size
                    {
                        Width = rand.Next(0, Size.MAX_WIDTH_PX + 1),
                        Height = rand.Next(0, Size.MAX_HEIGHT_PX + 1)
                    };

                    PatternElementBond bond = new PatternElementBond
                    {
                        PatternID = pattern.ID,
                        PatternElementID = element.ID,
                        NextPatternElementID = nextElement.ID,
                        ArrowVector = arrowVector,
                        Position = position,
                        Size = size
                    };

                    pattern.Bonds.Add(bond);
                }

                Tag tag = _tags.ElementAt(rand.Next(0, _tags.Count));
                pattern.PatternTags.Add(new PatternTag
                {
                    PatternID = pattern.ID,
                    TagID = tag.ID,
                });

                context.Patterns.Add(pattern);
            }

            context.SaveChanges();
        });

        private void FakeData()
        {
            _tags.Add(new Tag { Name = "Behaviour" });
            _tags.Add(new Tag { Name = "Face changes" });
            _tags.Add(new Tag { Name = "Spoken" });
            _tags.Add(new Tag { Name = "Anger" });
            _tags.Add(new Tag { Name = "Fear" });
            _tags.Add(new Tag { Name = "Happiness" });

            _elements.Add(new PatternElement { Name = "Escaping mood" });
            _elements.Add(new PatternElement { Name = "Happy answering" });
            _elements.Add(new PatternElement { Name = "Sad face" });
            _elements.Add(new PatternElement { Name = "Bad words" });
            _elements.Add(new PatternElement { Name = "Walking lower" });
            _elements.Add(new PatternElement { Name = "Looking by the window" });
            _elements.Add(new PatternElement { Name = "Looking the sky" });
            _elements.Add(new PatternElement { Name = "Hungry as fuck" });
            _elements.Add(new PatternElement { Name = "Driving faster" });
            _elements.Add(new PatternElement { Name = "Eating" });
            _elements.Add(new PatternElement { Name = "Drinking" });
            _elements.Add(new PatternElement { Name = "Crying" });
            _elements.Add(new PatternElement { Name = "Going to run" });
        }

        private bool IsFilled() => _elements.Count != 0 && _tags.Count != 0;
    }
}
