using System;
using System.Collections.Generic;
using camille.Generics;

namespace camille.DTO
{
    public class PatternElementDTO : BaseElementDTO, IIDEquality<PatternElementDTO>
    {
        public VectorDTO Position = new VectorDTO();

        public ICollection<Tuple<int, VectorDTO>> NextElements { get; set; } = new HashSet<Tuple<int, VectorDTO>>();

        public override bool Equals(object other) => IIDEquality<PatternElementDTO>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
    }
}
