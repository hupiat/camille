using System;
namespace camille.DTO
{
  public abstract class BaseElementDTO : IdElementDTO
  {
    public DateTime DateCreation { get; set; }

    public string Name { get; set; }
  }
}
