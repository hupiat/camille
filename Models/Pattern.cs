using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("Pattern")]
    public class Pattern : BaseElement
    {
        public ICollection<PatternTag> PatternTags { get; set; } = new HashSet<PatternTag>();

        public ICollection<PatternElementBond> Bonds { get; set; } = new HashSet<PatternElementBond>();

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is Pattern)) return false;

            Pattern o = other as Pattern;

            return o.ID == ID;
        }

        public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
    }
}
