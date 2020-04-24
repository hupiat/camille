using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("PatternElement")]
    public class PatternElement : BaseElement
    {

        public PatternElement()
        {
        }

        public PatternElement(int id, string name) : base(id, name)
        {
        }

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternElement)) return false;

            PatternElement o = other as PatternElement;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, Name, DateCreation);
        }
    }
}
