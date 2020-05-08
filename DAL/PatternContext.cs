using System;
using Microsoft.EntityFrameworkCore;
using camille.Models;

namespace camille.DAL
{
    public class PatternContext : DbContext
    {
        public DbSet<Pattern> Patterns { get; set; }
        public DbSet<PatternElement> PatternElements { get; set; }
        public DbSet<PatternElementBond> PatternElementBonds { get; set; }
        public DbSet<PatternElementPosition> PatternElementPositions { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<PatternTag> PatternTags { get; set; }

        public void SetupDatabase(bool withData)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();

            if (withData) new PatternDataInitializer(this);
        }

        public void Transaction(Action callback)
        {
            using var transaction = Database.BeginTransaction();
            callback.Invoke();
            transaction.Commit();
        }

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
