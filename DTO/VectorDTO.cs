using System;
using camille.Generics;

namespace camille.DTO
{
  public class VectorDTO : IdElementDTO, IIDEquality<VectorDTO>
  {
    public int X { get; set; }
    public int Y { get; set; }
    public int? Z { get; set; }

    public override bool Equals(object other) => IIDEquality<VectorDTO>.EqualsUsingId(this, other);

    public override int GetHashCode() => HashCode.Combine(ID, X, Y, Z);
  }
}
