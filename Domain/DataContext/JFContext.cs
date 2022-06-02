using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.DataContext
{
    public class JFContext : DbContext
    {
        public JFContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Parcel> Parcels { get; set; }
        public DbSet<Culture> Cultures { get; set; }
        public DbSet<County> Counties { get; set; }
        public DbSet<AppliedFertilizer> AppliedFertilizers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Parcel>()
            .Property(p => p.Surface)
            .HasColumnType("decimal(18,2)");

            builder.Entity<AppliedFertilizer>()
            .Property(p => p.AppliedWeightPerHa)
            .HasColumnType("decimal(18,2)");
        }
    }
}

