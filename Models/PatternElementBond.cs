using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("PatternElementBond")]
    public class PatternElementBond : DatabaseElement
    {
        [Required]
        public int X { get; set; }

        [Required]
        public int Y { get; set; }

        [Required]
        [ForeignKey("Pattern")]
        public int PatternId { get; set; }

        [Required]
        [ForeignKey("PatternElement")]
        public int PatternElementId { get; set; }

        [ForeignKey("PatternElement")]
        public int NextPatternElementId { get; set; }

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternElementBond)) return false;

            PatternElementBond o = other as PatternElementBond;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(PatternId, PatternElementId, NextPatternElementId);
        }
    }
}
