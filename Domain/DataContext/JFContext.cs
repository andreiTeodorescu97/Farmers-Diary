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
    }
}
