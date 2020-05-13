using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using camille.Generics;

namespace camille.Models
{
  [Tables(ETables.PATTERN_ELEMENT_BOND)]
  public class PatternElementBond : DatabaseElement, IIDEquality<PatternElementBond>
  {
    [Required]
    [TablesForeignKey(ETables.PATTERN)]
    public int PatternID { get; set; }

    [Required]
    [TablesForeignKey(ETables.PATTERN_ELEMENT)]
    public int PatternElementID { get; set; }

    [TablesForeignKey(ETables.PATTERN_ELEMENT)]
    public int? NextPatternElementID { get; set; }

    [Required]
    public Vector Position { get; set; } = new Vector();

    [NotMapped]
    public string NameElement { get; set; }

    public Vector ArrowVector { get; set; }

    public override bool Equals(object other) => IIDEquality<PatternElementBond>.EqualsUsingId(this, other);

    public override int GetHashCode() =>
        HashCode.Combine(ID, PatternID, PatternElementID, NextPatternElementID, NameElement, ArrowVector);
  }
}
