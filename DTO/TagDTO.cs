using System;
namespace camille.DTO
{
    public class TagDTO : BaseElementDTO
    {
        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is TagDTO)) return false;

            TagDTO o = other as TagDTO;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ID, Name, DateCreation);
        }
    }
}
