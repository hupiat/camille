﻿using System;
using System.ComponentModel.DataAnnotations;
using camille.Generics;

namespace camille.Models
{
    [Tables(ETables.VECTOR)]
    public class Vector : DatabaseElement, IIDEquality<Vector>
    {
        public static readonly int MAX_X_PX = 1920;
        public static readonly int MAX_Y_PX = 1080;

        [Required]
        public int X { get; set; }

        [Required]
        public int Y { get; set; }

        public int? Z { get; set; }

        public override bool Equals(object other) => IIDEquality<Vector>.EqualsUsingId(this, other);

        public override int GetHashCode() => HashCode.Combine(ID, X, Y, Z);
    }
}
