using System;
using System.Collections.Generic;
using System.Linq;

namespace camille.Helpers
{
    public abstract class CollectionHelper<T>
    {
        public static ICollection<T> Where(IEnumerable<T> collection, Predicate<T> check) => collection.Where(check.Invoke).ToList();
    }
}
