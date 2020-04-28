using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    [Table("PatternTag")]
    public class PatternTag : DatabaseElement
    {
        [Required]
        [ForeignKey("Pattern")]
        public int PatternId { get; set; }

        [Required]
        [ForeignKey("Tag")]
        public int TagId { get; set; }

        [NotMapped]
        public string Name { get; set; }

        public override bool Equals(object other)
        {
            if (other == null) return false;

            if (!(other is PatternTag)) return false;

            PatternTag o = other as PatternTag;

            return o.ID == ID;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(PatternId, TagId);
        }
    }
}
