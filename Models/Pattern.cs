using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("Pattern")]
    public class Pattern : BaseElement
    {
        public ICollection<PatternElement> Elements { get; set; }
        public ICollection<Tag> Tags { get; set; }

        public Pattern()
        {
        }

        public Pattern(int id, string name) : base(id, name)
        {
            Elements = new List<PatternElement>();
            Tags = new HashSet<Tag>();
        }

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is Pattern)) return false;

            Pattern o = other as Pattern;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, Name, DateCreation);
        }
    }
}
