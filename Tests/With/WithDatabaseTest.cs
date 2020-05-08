using System;
using camille.DAL;

namespace Tests.With
{
    internal abstract class WithDatabaseTest
    {
        protected static PatternContext context;

        public WithDatabaseTest()
        {
            if (context == null)
            {
                PatternDataInitializer.PATTERNS = 5;
                context = new PatternContext();
                context.SetupDatabase(true);
            }
        }
    }
}
