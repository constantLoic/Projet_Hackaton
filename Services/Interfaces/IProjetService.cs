using DevApi.Models;

namespace DevApi.Services.Interfaces
{
    public interface IProjetService
    {
        Task Add(string name, string description);
        Task<Projet[]> GetAll();
    }
}