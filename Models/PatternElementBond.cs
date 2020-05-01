using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("PatternElementBond")]
    public class PatternElementBond : DatabaseElement
    {
        [Required]
        [ForeignKey("Pattern")]
        public int PatternId { get; set; }

        [Required]
        [ForeignKey("PatternElement")]
        public int PatternElementId { get; set; }

        [ForeignKey("PatternElement")]
        public int? NextPatternElementId { get; set; }

        [NotMapped]
        public string NameElement { get; set; }

        public PatternElementPosition Position { get; set; } = new PatternElementPosition();

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternElementBond)) return false;

            PatternElementBond o = other as PatternElementBond;

            return o.ID == ID;
        }

        public override int GetHashCode() => HashCode.Combine(ID, PatternId, PatternElementId, NextPatternElementId, NameElement);
    }
}
