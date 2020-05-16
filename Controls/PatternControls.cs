using System;
using System.Linq;
using camille.DTO;
using camille.Models;

namespace camille.Controls
{
  public abstract class PatternControls
  {
    public static void Check(PatternDTO pattern)
    {
      if (pattern.Tags.Count == 0)
      {
        throw new ArgumentException($"Pattern should have at least one Tag (tried with id {pattern.ID})");
      }

      if (pattern.Elements.Count < 2)
      {
        throw new ArgumentException($"Pattern should have at least two Elements (tried with id {pattern.ID})");
      }

      PatternElementDTO[] elements = pattern.Elements.ToArray();

      foreach (int i in Enumerable.Range(0, pattern.Elements.Count))
      {
        foreach (Tuple<int, VectorDTO> next in elements[i].NextElements)
        {
          if (!elements.Any(e => e.ID == next.Item1))
          {
            throw new ArgumentException(
                $"Elements should point on ones which are contained in this pattern " +
                $"(tried with ids {elements[i].ID}, {next.Item1})");
          }
        }
      }

      foreach (PatternElementDTO element in pattern.Elements)
      {
        if (element.Position.X > Vector.MAX_X_VW || element.Position.Y > Vector.MAX_Y_VH)
        {
          throw new ArgumentException($"Elements should have corrects vector values (tried with id {element.ID})");
        }
      }

      foreach (PatternElementDTO element in pattern.Elements)
      {
        if (element.NextElements.Any(e => e.Item1 == 0))
        {
          throw new ArgumentException(
              $"Elements which does not have next one should not have arrow vector (tried with id {element.ID})");
        }
      }
    }
  }
}
