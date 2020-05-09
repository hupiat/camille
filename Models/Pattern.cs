using System;
using System.Collections.Generic;
using camille.Generics;

namespace camille.Models
{
    [Tables(ETables.PATTERN)]
    public class Pattern : BaseElement, IIDEquality<Pattern>
    {
        public ICollection<PatternTag> PatternTags { get; set; } = new HashSet<PatternTag>();

        public ICollection<PatternElementBond> Bonds { get; set; } = new HashSet<PatternElementBond>();

        public override bool Equals(object other) => IIDEquality<Pattern>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
    }
}
