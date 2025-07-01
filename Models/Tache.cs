namespace DevApi.Models
{
    public class Tache
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Deadline { get; set; }

        public bool IsDone { get; set; } = false;

        public int ProjetId { get; set; }

        public Projet Projet { get; set; }
    }
}
