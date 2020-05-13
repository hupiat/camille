using System;
using System.Collections.Generic;
using camille.Generics;

namespace camille.Models
{
  [Tables(ETables.TAG)]
  public class Tag : BaseElement, IIDEquality<Tag>
  {
    public ICollection<PatternTag> PatternTags { get; set; } = new HashSet<PatternTag>();

    public override bool Equals(object other) => IIDEquality<Tag>.EqualsUsingId(this, other);

    public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
  }
}
