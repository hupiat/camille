using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("Tag")]
    public class Tag : BaseElement
    {
        public ICollection<PatternTag> PatternTags { get; set; } = new HashSet<PatternTag>();

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is Tag)) return false;

            Tag o = other as Tag;

            return o.ID == ID;
        }

        public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
    }
}
