using System;
using System.Collections.Generic;
using System.Linq;
using camille.DTO;
using camille.Mappers;
using camille.Models;
using NUnit.Framework;
using Tests.With;

namespace camille.Tests.Mappers
{
    [TestFixture]
    internal class PatternMapperTest : WithModelTest
    {
        public PatternMapperTest() : base()
        {
        }

        [Test]
        public void ToDTOCollectionTest()
        {
            IEnumerable<PatternDTO> dtos = PatternMapper.Map(patterns, elements, tags);

            Pattern pattern = patterns.First();
            PatternDTO dto = dtos.FirstOrDefault();

            if (dto == null)
            {
                Assert.Fail("No pattern found after mapping");
            }

            AssertPatternIsEqualToDTO(pattern, dto);
        }

        [Test]
        public void ToDTOTest()
        {
            Pattern pattern = patterns.First();
            PatternDTO dto = PatternMapper.Map(pattern, elements, tags);

            AssertPatternIsEqualToDTO(pattern, dto);
        }

        [Test]
        public void ToPatternTest()
        {
            Pattern pattern = patterns.First();
            PatternDTO dto = PatternMapper.Map(pattern, elements, tags);
            pattern = PatternMapper.Map(dto, positions, bonds, patternTags);

            AssertPatternIsEqualToDTO(pattern, dto);
        }

        private void AssertPatternIsEqualToDTO(Pattern pattern, PatternDTO dto)
        {
            Assert.AreEqual(pattern.ID, dto.ID);
            Assert.AreEqual(pattern.Name, dto.Name);
            Assert.AreEqual(pattern.DateCreation, dto.DateCreation);

            foreach (PatternElementBond bond in pattern.Bonds)
            {
                bool hasElement = dto.Elements.Any(e => e.ID == bond.PatternElementId);
                Assert.True(hasElement);
            }

            foreach (PatternTag patternTag in pattern.PatternTags)
            {
                bool hasTag = dto.Tags.Any(t => t.ID == patternTag.TagId);
                Assert.True(hasTag);
            }
        }
    }
}
