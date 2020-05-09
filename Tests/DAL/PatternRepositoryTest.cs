using System;
using System.Collections.Generic;
using System.Linq;
using camille.DAL;
using camille.Helpers;
using camille.Models;
using NUnit.Framework;
using Tests.With;

namespace Tests.DAL
{
    [TestFixture]
    internal class PatternRepositoryTest : WithDatabaseTest
    {
        private PatternRepository _repository;

        public PatternRepositoryTest() : base()
        {
        }

        [OneTimeSetUp]
        public void Init()
        {
            _repository = new PatternRepository(context);
        }

        [Test, Order(1)]
        public void FetchAllPatterns()
        {
            ICollection<Pattern> patterns = _repository.FetchAllPatterns();

            Assert.IsNotEmpty(patterns);
        }

        [Test, Order(2)]
        public void FetchAllPatternElements()
        {
            ICollection<PatternElement> elements = _repository.FetchAllPatternElements();

            Assert.IsNotEmpty(elements);
        }

        [Test, Order(3)]
        public void FetchAllTags()
        {
            ICollection<Tag> tags = _repository.FetchAllTags();

            Assert.IsNotEmpty(tags);
        }


        [Test, Order(4)]
        public void FetchAllBonds()
        {
            ICollection<PatternElementBond> bonds = _repository.FetchAllBonds();

            Assert.IsNotEmpty(bonds);
        }

        [Test, Order(5)]
        public void FetchAllVectors()
        {
            ICollection<Vector> positions = _repository.FetchAllVectors();

            Assert.IsNotEmpty(positions);
        }

        [Test, Order(6)]
        public void FetchAllPatternTags()
        {
            ICollection<PatternTag> patternTags = _repository.FetchAllPatternTags();

            Assert.IsNotEmpty(patternTags);
        }

        [Test, Order(7)]
        public void FetchAllSizes()
        {
            ICollection<Size> sizes = _repository.FetchAllSizes();

            Assert.IsNotEmpty(sizes);
        }

        [Test, Order(8)]
        public void Insert()
        {
            Pattern pattern = new Pattern
            {
                Name = "Foo",
                PatternTags = new HashSet<PatternTag>
                {
                    new PatternTag
                    {
                        NameTag = "FooTag"
                    }
                },
                Bonds = new HashSet<PatternElementBond>
                {
                    new PatternElementBond
                    {
                        NameElement = "FooElement"
                    }
                }
            };

            _repository.Insert(pattern);

            Assert.AreNotEqual(0, pattern.ID);
        }

        [Test, Order(9)]
        public void Update()
        {
            int id = 1;
            string name = "Foo";
            Pattern pattern = context.Patterns.Find(id);

            if (pattern == null)
            {
                Assert.Fail($"No pattern found for test (tried with id {id})");
            }

            pattern.Name = name;
            pattern.PatternTags = new HashSet<PatternTag>
            {
                new PatternTag
                {
                    PatternID = 1,
                    NameTag = "FooTag"
                }
            };
            pattern.Bonds = new HashSet<PatternElementBond>
            {
                new PatternElementBond
                {
                    PatternID = 1,
                    NameElement = "FooElement",
                }
            };

            _repository.Update(pattern);

            ICollection<PatternTag> patternTagsUpdated = CollectionHelper<PatternTag>
                .Where(context.PatternTags, pt => pt.PatternID == pattern.ID);
            ICollection<PatternElementBond> bondsUpdated = CollectionHelper<PatternElementBond>
                .Where(context.PatternElementBonds, b => b.PatternID == pattern.ID);

            Assert.AreEqual(name, pattern.Name);

            foreach (PatternTag patternTag in pattern.PatternTags)
            {
                bool hasTag = patternTagsUpdated.Any(pt => pt.ID == patternTag.ID);
                Assert.True(hasTag);
            }

            foreach (PatternElementBond bond in pattern.Bonds)
            {
                bool hasElement = bondsUpdated.Any(b => b.ID == bond.ID);
                Assert.True(hasElement);
            }
        }

        [Test, Order(11)]
        public void RemovePatternElement()
        {
            int id = 1;
            _repository.RemovePatternElement(id);
            PatternElement element = context.PatternElements.Find(id);

            Assert.IsNull(element);
        }

        [Test, Order(12)]
        public void RemoveTag()
        {
            int id = 1;
            _repository.RemoveTag(id);
            Tag tag = context.Tags.Find(id);

            Assert.IsNull(tag);
        }

        [Test, Order(13)]
        public void RemovePattern()
        {
            int id = 1;
            _repository.RemovePattern(id);
            Pattern pattern = context.Patterns.Find(id);

            Assert.IsNull(pattern);
        }
    }
}
