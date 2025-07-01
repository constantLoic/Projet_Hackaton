using Microsoft.EntityFrameworkCore;

namespace DevApi.Models
{
    public class BddContext : DbContext
    {
        public BddContext(DbContextOptions<BddContext> options) : base(options) { }

        public DbSet<Projet> Projets { get; set; }
        public DbSet<Tache> Taches { get; set; }
    }
}
