namespace DevApi.Models
{
    public class Projet
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<Tache> Taches { get; set; }
    }
}
