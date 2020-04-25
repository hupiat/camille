using System;
using System.Collections.Generic;
using System.Linq;
using camille.Models;

namespace camille.DAL
{
    public abstract class PatternDataInitializer
    {
        private readonly static int PATTERNS = 100;
        private readonly static int MAX_ELEMENTS_BY_PATTERNS = 15;

        private readonly static ICollection<PatternElement> _elements = new HashSet<PatternElement>();
        private readonly static ICollection<Tag> _tags = new HashSet<Tag>();

        public static void Inject(PatternContext context)
        {
            if (_elements.Count == 0 || _tags.Count == 0)
            {
                FillData();
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

                int elementsLength = rand.Next(1, MAX_ELEMENTS_BY_PATTERNS);

                foreach (int _ in Enumerable.Range(0, elementsLength))
                {
                    PatternElement element = _elements.ElementAt(rand.Next(0, _elements.Count));
                    PatternElement nextElement = _elements.ElementAt(rand.Next(0, _elements.Count));
                    pattern.Bonds.Add(new PatternElementBond
                    {
                        PatternId = pattern.ID,
                        PatternElementId = element.ID,
                        NextPatternElementId = nextElement.ID,
                    });
                }

                Tag tag = _tags.ElementAt(rand.Next(0, _tags.Count));
                pattern.PatternTags.Add(new PatternTag
                {
                    PatternId = pattern.ID,
                    TagId = tag.ID,
                });

                context.Patterns.Add(pattern);
            }

            context.SaveChanges();
        }

        private static void FillData()
        {
            _tags.Add(new Tag() { Name = "Behaviour" });
            _tags.Add(new Tag() { Name = "Face changes" });
            _tags.Add(new Tag() { Name = "Spoken" });

            _elements.Add(new PatternElement { Name = "Escaping mood" });
            _elements.Add(new PatternElement { Name = "Happy answering" });
            _elements.Add(new PatternElement { Name = "Sad face" });
            _elements.Add(new PatternElement { Name = "Bad words" });
            _elements.Add(new PatternElement { Name = "Walking lower" });
            _elements.Add(new PatternElement { Name = "Looking by the window" });
            _elements.Add(new PatternElement { Name = "Looking the sky" });
            _elements.Add(new PatternElement { Name = "Hungry as fuck" });
            _elements.Add(new PatternElement { Name = "Driving faster" });
        }
    }
}
