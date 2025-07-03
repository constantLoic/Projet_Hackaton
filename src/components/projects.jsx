// src/pages/Projects.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Développement d'un Chatbot étudiant",
      description: "Chatbot pour répondre aux questions fréquentes des étudiants.",
      deadline: "2025-07-15"
    },
    {
      id: 2,
      title: "Application de gestion de cours",
      description: "App permettant aux profs et étudiants de gérer les cours et supports.",
      deadline: "2025-07-20"
    },
    {
      id: 3,
      title: "Système de notation en ligne",
      description: "Système sécurisé pour noter les devoirs et examens.",
      deadline: "2025-08-01"
    }
  ]);

  const [newProject, setNewProject] = useState({ title: '', description: '', deadline: '' });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newProject.title || !newProject.description || !newProject.deadline) return;
    const id = projects.length + 1;
    setProjects([...projects, { id, ...newProject }]);
    setNewProject({ title: '', description: '', deadline: '' });
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleEdit = (id, field, value) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projets Universitaires en Informatique</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <input name="title" placeholder="Titre" value={newProject.title} onChange={handleChange} className="mr-2 p-1" />
        <input name="description" placeholder="Description" value={newProject.description} onChange={handleChange} className="mr-2 p-1" />
        <input name="deadline" type="date" value={newProject.deadline} onChange={handleChange} className="mr-2 p-1" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">Ajouter</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="border rounded-xl shadow p-4 bg-white">
            <input
              value={project.title}
              onChange={(e) => handleEdit(project.id, 'title', e.target.value)}
              className="text-xl font-semibold w-full mb-1"
            />
            <textarea
              value={project.description}
              onChange={(e) => handleEdit(project.id, 'description', e.target.value)}
              className="text-sm text-gray-600 w-full mb-1"
            />
            <input
              type="date"
              value={project.deadline}
              onChange={(e) => handleEdit(project.id, 'deadline', e.target.value)}
              className="text-xs text-gray-500 mb-2"
            />
            <Link
              to={`/project/${project.id}`}
              className="mt-1 inline-block text-blue-500 hover:underline text-sm"
            >
              Voir le projet
            </Link>
            <button onClick={() => handleDelete(project.id)} className="text-red-500 ml-4 text-sm">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}
