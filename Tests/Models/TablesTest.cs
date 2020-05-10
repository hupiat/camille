using System;
using System.Collections.Generic;
using camille.Models;
using NUnit.Framework;

namespace camille.Tests.Models
{
  [TestFixture]
  internal class TablesTest
  {
    private readonly Dictionary<ETables, string> _expected = new Dictionary<ETables, string>();

    [SetUp]
    public void Init()
    {
      _expected.Add(ETables.PATTERN, "Pattern");
      _expected.Add(ETables.PATTERN_ELEMENT, "PatternElement");
      _expected.Add(ETables.PATTERN_ELEMENT_BOND, "PatternElementBond");
      _expected.Add(ETables.PATTERN_TAG, "PatternTag");
      _expected.Add(ETables.TAG, "Tag");
      _expected.Add(ETables.VECTOR, "Vector");
    }

    [Test]
    public void GetTableName()
    {
      foreach (KeyValuePair<ETables, string> pair in _expected)
      {
        string tableName = pair.Key.GetTableName();
        Assert.AreEqual(pair.Value, tableName);
      }
    }
  }
}
