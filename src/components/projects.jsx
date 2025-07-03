import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    deadline: ''
  });

  const API_BASE_URL = 'http://91.214.190.46:5000';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get(`${API_BASE_URL}/Projet`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des projets', error);
      });
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const { name, description, deadline } = newProject;
    if (!name || !description || !deadline) return;

    axios.post(`${API_BASE_URL}/Projet`, null, {
      params: {
        name,
        description,
        deadline,
      }
    })
      .then(() => {
        fetchProjects(); // recharge les projets après ajout
        setNewProject({ name: '', description: '', deadline: '' });
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout du projet", error);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projets Universitaires</h1>

      <div className="bg-gray-100 p-4 rounded mb-6 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          name="name"
          placeholder="Nom du projet"
          value={newProject.name}
          onChange={handleChange}
          className="p-2 rounded border"
        />
        <input
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleChange}
          className="p-2 rounded border"
        />
        <input
          name="deadline"
          type="date"
          value={newProject.deadline}
          onChange={handleChange}
          className="p-2 rounded border"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-4"
        >
          Ajouter
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="border rounded-xl shadow p-4 bg-white">
            <h2 className="text-xl font-semibold mb-1">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{project.description}</p>
            <p className="text-xs text-gray-500 mb-2">
              Deadline : {project.deadline?.split("T")[0] || 'Non spécifiée'}
            </p>
            <Link
              to={`/project/${project.id}`}
              className="mt-1 inline-block text-blue-500 hover:underline text-sm"
            >
              Voir le projet
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
