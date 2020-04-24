using System;
using camille.Models;
using Microsoft.EntityFrameworkCore;

namespace camille.DAL
{
    public class PatternContext : DbContext
    {
        public DbSet<Pattern> Patterns { get; set; }
        public DbSet<PatternElement> PatternElements { get; set; }
        public DbSet<Tag> Tags { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("" +
                "Server=localhost;" +
                "Database=camille;" +
                "user id=SA;" +
                "password=Camille2020;" +
                "persist security info=True;" +
                "MultipleActiveResultSets=true");
        }
    }
}
