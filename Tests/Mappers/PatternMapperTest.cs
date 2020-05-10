using System;
using System.Collections.Generic;
using System.Linq;
using camille.DTO;
using camille.Mappers;
using camille.Models;
using NUnit.Framework;
using camille.Tests.With;

namespace camille.Tests.Mappers
{
  [TestFixture]
  internal class PatternMapperTest : WithModelTest
  {
    public PatternMapperTest() : base()
    {
    }

    [Test]
    public void ToTagDTO()
    {
      Tag[] tagsArray = tags.ToArray();
      TagDTO[] dtos = PatternMapper.AsTagDTOCollection(tags).ToArray();

      foreach (int i in Enumerable.Range(0, dtos.Count()))
      {
        Tag tag = tagsArray[i];
        TagDTO dto = dtos[i];

        Assert.AreEqual(tag.ID, dto.ID);
        Assert.AreEqual(tag.Name, dto.Name);
        Assert.AreEqual(tag.DateCreation, dto.DateCreation);
      }
    }

    [Test]
    public void ToDTOCollection()
    {
      IEnumerable<PatternDTO> dtos = PatternMapper.AsPatternsDTOEnumerable(patterns, elements, tags);

      Pattern pattern = patterns.First();
      PatternDTO dto = dtos.FirstOrDefault();

      if (dto == null)
      {
        Assert.Fail("No pattern found after mapping");
      }

      AssertPatternIsEqualToDTO(pattern, dto);
    }

    [Test]
    public void ToPattern()
    {
      Pattern pattern = patterns.First();
      PatternDTO dto = PatternMapper.AsPatternDTO(pattern, elements, tags);
      pattern = PatternMapper.AsPattern(dto, vectors, bonds, patternTags);

      AssertPatternIsEqualToDTO(pattern, dto);
    }

    private void AssertPatternIsEqualToDTO(Pattern pattern, PatternDTO dto)
    {
      Assert.AreEqual(pattern.ID, dto.ID);
      Assert.AreEqual(pattern.Name, dto.Name);
      Assert.AreEqual(pattern.DateCreation, dto.DateCreation);

      foreach (PatternElementBond bond in pattern.Bonds)
      {
        bool hasElement = dto.Elements.Any(e => e.ID == bond.PatternElementID);
        Assert.True(hasElement);
      }

      foreach (PatternTag patternTag in pattern.PatternTags)
      {
        bool hasTag = dto.Tags.Any(t => t.ID == patternTag.TagID);
        Assert.True(hasTag);
      }
    }
  }
}
