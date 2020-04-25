using System;
using System.Collections;
using System.Collections.Generic;

namespace camille.DTO
{
    public class PatternElementDTO : BaseElementDTO
    {
        public ICollection<int> NextElementsIds { get; set; } = new HashSet<int>();

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternElementDTO)) return false;

            PatternElementDTO o = other as PatternElementDTO;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, Name, DateCreation);
        }
    }
}
