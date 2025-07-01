using DevApi.Models;
using DevApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace DevApi.Services
{
    public class TacheService : ITacheService
    {
        private BddContext Context { get; set; }

        public TacheService(BddContext context)
        {
            Context = context;
        }

        public async Task<Tache[]> GetAll()
        {
            return await Context.Taches.ToArrayAsync().ConfigureAwait(false);
        }

        public async Task Add(string name, string description, string date, int projetId)
        {
            await Context.Taches.AddAsync(new Tache { Name = name, Description = description, Deadline = DateTime.Parse(date, new CultureInfo("fr-FR")), ProjetId = projetId }).ConfigureAwait(false);
            await Context.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task Remove(int id)
        {
            Tache? tache = Context.Taches.FirstOrDefault(x => x.Id == id);
            if (tache != null)
            {
                Context.Taches.Remove(tache);
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task ChangeStatus(int id)
        {
            Tache? tache = Context.Taches.FirstOrDefault(x => x.Id == id);
            if (tache != null)
            {
                tache.IsDone = !tache.IsDone;
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}
