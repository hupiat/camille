using System;
using System.Linq;
using camille.Controls;
using camille.DTO;
using camille.Tests.With;
using NUnit.Framework;

namespace camille.Tests.Controls
{
  internal class PatternControlsTest : WithDTOTest
  {
    public PatternControlsTest() : base()
    {
    }

    [Test]
    public void Check()
    {
      PatternDTO pattern = patterns.First();
      try
      {
        PatternControls.Check(pattern);
      }
      catch (ArgumentException e)
      {
        Assert.Fail(e.Message);
      }
    }

    [Test]
    public void CheckWithErrors()
    {
      try
      {
        PatternControls.Check(new PatternDTO());
        Assert.Fail("Check should have failed");
      }
      catch
      {
        // Test satisfied
      }
    }
  }
}
