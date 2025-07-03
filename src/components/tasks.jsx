import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://91.214.190.46:5000";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    date: "",
    projetId: "",
    isDone: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(`${API_BASE_URL}/Tache`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Erreur fetch tasks:", err));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTask = () => {
  const { name, description, date, projetId, isDone } = newTask;

  if (!name || !description || !date || !projetId) {
    alert("Merci de remplir tous les champs obligatoires");
    return;
  }

  const isoDate = date.includes("T") ? date : date + "T00:00:00";

  axios
    .post(
      `${API_BASE_URL}/Tache`,
      null,
      {
        params: {
          name,
          description,
          date: isoDate,
          projetId: Number(projetId),
          isDone: isDone ? "true" : "false",
        },
      }
    )
    .then(() => {
      fetchTasks();
      setNewTask({
        name: "",
        description: "",
        date: "",
        projetId: "",
        isDone: false,
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        console.error("Erreur réponse API :", error.response.data);
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            console.error(`Erreur champ ${field}: ${messages.join(", ")}`);
          });
        }
      } else {
        console.error("Erreur Axios :", error.message);
      }
    });
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tâches</h1>

      <div className="mb-6 flex flex-col gap-3">
        <input
          name="name"
          value={newTask.name}
          onChange={handleChange}
          placeholder="Nom de la tâche"
          className="border p-2 rounded"
        />
        <input
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={newTask.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="projetId"
          value={newTask.projetId}
          onChange={handleChange}
          placeholder="ID du projet (nombre)"
          type="number"
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isDone"
            checked={newTask.isDone}
            onChange={handleChange}
          />
          Tâche terminée
        </label>

        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border rounded shadow bg-white"
          >
            <h3 className={task.isDone ? "line-through" : ""}>{task.name}</h3>
            <p>{task.description}</p>
            <p>
              Date :{" "}
              {task.date
                ? new Date(task.date).toLocaleDateString("fr-FR")
                : "N/A"}
            </p>
            <p>Projet ID : {task.projetId}</p>
            <p>Status : {task.isDone ? "Terminée" : "En cours"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
