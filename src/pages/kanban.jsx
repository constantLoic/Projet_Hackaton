// src/pages/Kanban.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Kanban() {
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });
  const [newTask, setNewTask] = useState('');
  const [newStatus, setNewStatus] = useState('todo');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://91.214.190.46:5000/api/tasks');
        const grouped = { todo: [], doing: [], done: [] };
        response.data.forEach(task => grouped[task.status].push(task));
        setTasks(grouped);
      } catch (error) {
        console.error("Erreur chargement tâches:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post('http://91.214.190.46:5000/api/tasks', {
        title: newTask,
        status: newStatus
      });
      const task = response.data;
      setTasks({ ...tasks, [task.status]: [...tasks[task.status], task] });
      setNewTask('');
    } catch (error) {
      console.error("Erreur ajout tâche:", error);
    }
  };

  const handleDelete = async (status, id) => {
    try {
      await axios.delete(`http://91.214.190.46:5000/api/tasks/${id}`);
      const updated = tasks[status].filter(t => t.id !== id);
      setTasks({ ...tasks, [status]: updated });
    } catch (error) {
      console.error("Erreur suppression tâche:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau Kanban</h1>
      <div className="mb-4 flex gap-2">
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className="border p-2 rounded" placeholder="Nouvelle tâche" />
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border p-2 rounded">
          <option value="todo">À faire</option>
          <option value="doing">En cours</option>
          <option value="done">Terminé</option>
        </select>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded">Ajouter</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['todo', 'doing', 'done'].map(status => (
          <div key={status} className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-2 capitalize">{status === 'todo' ? 'À faire' : status === 'doing' ? 'En cours' : 'Terminé'}</h2>
            <ul>
              {tasks[status].map((task) => (
                <li key={task.id} className="bg-white p-2 mb-2 rounded shadow flex justify-between items-center">
                  {task.title}
                  <button onClick={() => handleDelete(status, task.id)} className="text-red-500 text-xs">✖</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
