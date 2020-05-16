using System;
using System.Collections.Generic;
using camille.DTO;
using camille.Models;

namespace camille.Tests.With
{
  internal class WithDTOTest
  {
    protected ICollection<PatternDTO> patterns;
    protected ICollection<PatternElementDTO> elements;
    protected ICollection<TagDTO> tags;
    protected ICollection<VectorDTO> vectors;

    public WithDTOTest()
    {
      var vector = new VectorDTO
      {
        X = Vector.MAX_X_VW,
        Y = Vector.MAX_Y_VH
      };

      var arrowVector = new VectorDTO
      {
        X = Vector.MAX_X_VW,
        Y = Vector.MAX_Y_VH,
        Z = 100
      };

      elements = new HashSet<PatternElementDTO>
            {
                new PatternElementDTO
                {
                    ID = 1,
                    Name = "Fake element",
                    DateCreation = DateTime.UtcNow,
                    Position = vector,
                    NextElements = new HashSet<Tuple<int, VectorDTO>>
                    {
                        Tuple.Create(2, arrowVector)
                    }
                },
                new PatternElementDTO
                {
                    ID = 2,
                    Name = "Fake element 2",
                    DateCreation = DateTime.UtcNow,
                    Position = vector
                }
            };

      tags = new HashSet<TagDTO>
            {
                new TagDTO
                {
                    ID = 1,
                    Name = "Fake tag",
                    DateCreation = DateTime.UtcNow,
                }
            };

      patterns = new HashSet<PatternDTO>
            {
                new PatternDTO
                {
                    ID = 1,
                    Name = "Fake pattern",
                    DateCreation = DateTime.UtcNow,
                    Elements = elements,
                    Tags = tags
                }
            };

      vectors = new HashSet<VectorDTO> { vector };
    }
  }
}
