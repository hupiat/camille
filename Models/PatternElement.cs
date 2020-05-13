using System;
using System.Collections.Generic;
using camille.Generics;

namespace camille.Models
{
  [Tables(ETables.PATTERN_ELEMENT)]
  public class PatternElement : BaseElement, IIDEquality<PatternElement>
  {
    public ICollection<PatternElementBond> Bonds = new HashSet<PatternElementBond>();

    public override bool Equals(object other) => IIDEquality<PatternElement>.EqualsUsingId(this, other);

    public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
  }
}
