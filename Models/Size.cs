using System;
using System.ComponentModel.DataAnnotations;
using camille.Generics;

namespace camille.Models
{
    [Tables(ETables.SIZE)]
    public class Size : DatabaseElement, IIDEquality<Size>
    {
        public static readonly int MAX_WIDTH_PX = 400;
        public static readonly int MAX_HEIGHT_PX = 400;

        [Required]
        public int Width { get; set; }

        [Required]
        public int Height { get; set; }

        public override bool Equals(object other) => IIDEquality<Size>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, Width, Height);
    }
}
