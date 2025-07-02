import { useEffect, useState } from "react";
//import api from "../api";

const STATUSES = ["todo", "inprogress", "done"];

export default function Kanban() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/Tache")
      .then((res) => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  const tasksByStatus = (status) => tasks.filter(t => t.status === status);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-4">
      {STATUSES.map((status) => (
        <div key={status} className="bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-bold capitalize mb-4">{status}</h3>
          {tasksByStatus(status).length === 0 && (
            <p className="text-gray-500">Aucune tâche</p>
          )}
          <ul className="space-y-2">
            {tasksByStatus(status).map(({ id, name, description }) => (
              <li key={id} className="bg-white p-3 rounded shadow">
                <h4 className="font-semibold">{name}</h4>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
