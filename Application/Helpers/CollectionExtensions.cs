using System.Collections.Generic;

namespace Infrastructure.Helper
{
    public static class CollectionExtensions
    {
        public static IEnumerable<T> AsList<T>(this T item)
        {
            if (item == null)
                return null;

            return new List<T>
            {
                item
            };
        }
    }
}
