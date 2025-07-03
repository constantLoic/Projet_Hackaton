import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Lire la doc API", completed: false },
    { id: 2, name: "Faire la maquette", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newEntry = {
      id: Date.now(),
      name: newTask,
      completed: false,
    };
    setTasks([...tasks, newEntry]);
    setNewTask("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.name);
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, name: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tâches</h1>
      <div className="mb-4 flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Ajouter une nouvelle tâche"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {editingId === task.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border p-1 rounded w-full mr-2"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Sauver
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.name}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(task.id)}
                    className="text-blue-500 text-sm"
                  >
                    {task.completed ? "↩️" : "✔️"}
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-yellow-500 text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 text-sm"
                  >
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
