using System;

namespace camille.Generics
{
    public interface IIDEquality<T> where T : IID
    {
        public static bool EqualsUsingId(T comparing, object other)
        {
            if (other == null) return false;

            if (!(other is T)) return false;

            T o = (T)other;

            if (comparing.ID == 0 || o.ID == 0) return false;

            return o.ID == comparing.ID;
        }
    }
}
