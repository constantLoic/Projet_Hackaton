using DevApi.Models;
using DevApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevApi.Services
{
    public class ProjetService : IProjetService
    {
        private BddContext Context { get; set; }

        public ProjetService(BddContext context)
        {
            this.Context = context;
        }

        public async Task<Projet[]> GetAll()
        {
            return await Context.Projets.ToArrayAsync().ConfigureAwait(false);
        }

        public async Task Add(string name, string description)
        {
            await Context.AddAsync(new Projet { Name = name, Description = description }).ConfigureAwait(false);
            await Context.SaveChangesAsync().ConfigureAwait(false);
        }
    }
}
