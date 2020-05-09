using System;
using camille.Generics;
using camille.Models;

namespace camille.DTO
{
    public class SizeDTO : IdElementDTO, IIDEquality<SizeDTO>
    {
        public int Width { get; set; }
        public int Height { get; set; }

        public override bool Equals(object other) => IIDEquality<SizeDTO>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, Width, Height);
    }
}
