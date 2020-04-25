using System;
using Microsoft.EntityFrameworkCore;
using camille.Models;

namespace camille.DAL
{
    public class PatternContext : DbContext
    {
        public DbSet<Pattern> Patterns { get; set; }
        public DbSet<PatternElement> PatternElements { get; set; }
        public DbSet<PatternElementBond> PatternElementsBonds { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<PatternTag> PatternTags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
            optionsBuilder.UseSqlServer(
                "Data source=localhost;" +
                "Database=camille;" +
                "User id=SA;" +
                "Password=Camille2020;" +
                "Persist security info=True;" +
                "MultipleActiveResultSets=True;");
    }
}
