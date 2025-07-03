// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://91.214.190.46:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Erreur de chargement des projets:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <Link key={proj.id} to={`/project/${proj.id}`} className="p-4 shadow rounded-lg bg-white hover:bg-gray-50">
            <h2 className="text-xl font-semibold">{proj.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}