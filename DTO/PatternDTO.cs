using System;
using System.Collections.Generic;

namespace camille.DTO
{
    public class PatternDTO : BaseElementDTO
    {
        public ICollection<TagDTO> Tags { get; set; } = new HashSet<TagDTO>();

        public ICollection<PatternElementDTO> Elements { get; set; } = new HashSet<PatternElementDTO>();

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternDTO)) return false;

            PatternDTO o = other as PatternDTO;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, Name, DateCreation);
        }
    }
}
