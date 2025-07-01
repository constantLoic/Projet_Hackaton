using DevApi.Models;

namespace DevApi.Services.Interfaces
{
    public interface ITacheService
    {
        Task Add(string name, string description, string date, int projetId);
        Task ChangeStatus(int id);
        Task<Tache[]> GetAll();
        Task Remove(int id);
    }
}