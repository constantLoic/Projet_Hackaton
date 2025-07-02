import { useEffect, useState } from "react";
//import api from "../api";
import Notification from "../pages/notifications.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notif, setNotif] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const showNotif = (message, type = "success") => {
    setNotif({ message, type });
    setTimeout(() => setNotif({ message: "", type: "" }), 3000);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Projet");
      setProjects(res.data);
    } catch (e) {
      showNotif("Erreur chargement projets", "error");
    }
    setLoading(false);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Nom et description obligatoires !");
      return;
    }
    try {
      await api.post("/Projet", { name, description });
      setName("");
      setDescription("");
      showNotif("Projet ajouté avec succès");
      fetchProjects();
    } catch (e) {
      showNotif("Échec de l'ajout.", "error");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await api.delete(`/Projet/${id}`);
      showNotif("Projet supprimé");
      fetchProjects();
    } catch (e) {
      showNotif("Échec de la suppression.", "error");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center">Gestion des Projets</h2>

      <Notification
        message={notif.message}
        type={notif.type}
        onClose={() => setNotif({ message: "", type: "" })}
      />

      <form onSubmit={handleAddProject} className="bg-white shadow-md rounded p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Ajouter un projet</h3>
        <input
          type="text"
          placeholder="Nom du projet"
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description du projet"
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
        >
          Ajouter
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">Aucun projet trouvé.</p>
      ) : (
        <ul className="space-y-6">
          {projects.map(({ id, name, description }) => (
            <li
              key={id}
              className="bg-white shadow-md rounded p-6 flex justify-between items-center"
            >
              <div>
                <h4 className="text-2xl font-semibold">{name}</h4>
                <p className="mt-2 text-gray-700">{description}</p>
              </div>
              <button
                onClick={() => handleDeleteProject(id)}
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
