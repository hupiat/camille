﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("PatternElementPosition")]
    public class PatternElementPosition : DatabaseElement
    {
        public static readonly int MAX_X = 1920;
        public static readonly int MAX_Y = 1080;

        [Required]
        public int X { get; set; }

        [Required]
        public int Y { get; set; }

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternElementPosition)) return false;

            PatternElementPosition o = other as PatternElementPosition;

            return o.ID == ID;
        }

        public override int GetHashCode() => HashCode.Combine(ID, X, Y);
    }
}
