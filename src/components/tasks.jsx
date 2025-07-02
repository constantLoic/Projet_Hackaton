import { useEffect, useState } from "react";
//import api from "../api";
import Notification from "../pages/notifications.jsx";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [notif, setNotif] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const showNotif = (message, type = "success") => {
    setNotif({ message, type });
    setTimeout(() => setNotif({ message: "", type: "" }), 3000);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Tache");
      setTasks(res.data);
    } catch (e) {
      showNotif("Erreur chargement tâches", "error");
    }
    setLoading(false);
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/Projet");
      setProjects(res.data);
    } catch (e) {
      showNotif("Erreur chargement projets", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!name || !description || !date || !projectId) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    try {
      await api.post(
        `/Tache?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&date=${encodeURIComponent(date)}&projetId=${projectId}`
      );
      setName("");
      setDescription("");
      setDate("");
      setProjectId(null);
      showNotif("Tâche ajoutée avec succès");
      fetchTasks();
    } catch (e) {
      showNotif("Échec de l'ajout.", "error");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await api.delete(`/Tache/id?id=${id}`);
      showNotif("Tâche supprimée");
      fetchTasks();
    } catch (e) {
      showNotif("Échec de la suppression.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center">Gestion des Tâches</h2>

      <Notification
        message={notif.message}
        type={notif.type}
        onClose={() => setNotif({ message: "", type: "" })}
      />

      <form onSubmit={handleAddTask} className="bg-white shadow-md rounded p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Ajouter une tâche</h3>
        <input
          type="text"
          placeholder="Nom de la tâche"
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description de la tâche"
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={projectId || ""}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="" disabled>
            Sélectionner un projet
          </option>
          {projects.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
        >
          Ajouter
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">Aucune tâche trouvée.</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map(({ id, name, description, date, projetId }) => (
            <li
              key={id}
              className="bg-white shadow-md rounded p-6 flex justify-between items-center"
            >
              <div>
                <h4 className="text-xl font-semibold">{name}</h4>
                <p className="mt-1 text-gray-700">{description}</p>
                <p className="mt-1 text-gray-500 text-sm">Deadline: {date}</p>
                <p className="mt-1 text-gray-500 text-sm">Projet ID: {projetId}</p>
              </div>
              <button
                onClick={() => handleDeleteTask(id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
