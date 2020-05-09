using System;
using System.Collections.Generic;
using camille.Generics;

namespace camille.DTO
{
    public class PatternDTO : BaseElementDTO, IIDEquality<PatternDTO>
    {
        public ICollection<TagDTO> Tags { get; set; } = new HashSet<TagDTO>();

        public ICollection<PatternElementDTO> Elements { get; set; } = new HashSet<PatternElementDTO>();

        public override bool Equals(object other) => IIDEquality<PatternDTO>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
    }
}
