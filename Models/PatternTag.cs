using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using camille.Generics;

namespace camille.Models
{
  [Tables(ETables.PATTERN_TAG)]
  public class PatternTag : DatabaseElement, IIDEquality<PatternTag>
  {
    [Required]
    [TablesForeignKey(ETables.PATTERN)]
    public int PatternID { get; set; }

    [Required]
    [TablesForeignKey(ETables.TAG)]
    public int TagID { get; set; }

    [NotMapped]
    public string NameTag { get; set; }

    public override bool Equals(object other) => IIDEquality<PatternTag>.EqualsUsingId(this, other);

    public override int GetHashCode() => HashCode.Combine(ID, PatternID, TagID, NameTag);
  }
}
