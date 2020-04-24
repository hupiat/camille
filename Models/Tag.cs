using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("Tag")]
    public class Tag : BaseElement
    {
        public Tag()
        {
        }

        public Tag(int id, string name) : base(id, name)
        {
        }

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is Tag)) return false;

            Tag o = other as Tag;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, Name, DateCreation);
        }
    }
}
