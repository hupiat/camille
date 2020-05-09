using System;
using camille.Generics;

namespace camille.DTO
{
    public class TagDTO : BaseElementDTO, IIDEquality<TagDTO>
    {
        public override bool Equals(object other) => IIDEquality<TagDTO>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, Name, DateCreation);
    }
}
