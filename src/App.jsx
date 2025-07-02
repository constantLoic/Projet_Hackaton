import { useState } from "react";
import Projects from "./components/projects.jsx";
import Tasks from "./components/tasks.jsx";
import Kanban from "./components/kanban.jsx";

export default function App() {
  const [page, setPage] = useState("projects");

  return (
    <div>
      <nav className="flex justify-center space-x-6 bg-blue-700 text-white p-4">
        <button onClick={() => setPage("projects")} className="hover:underline">
          Projets
        </button>
        <button onClick={() => setPage("tasks")} className="hover:underline">
          Tâches
        </button>
        <button onClick={() => setPage("kanban")} className="hover:underline">
          Kanban
        </button>
      </nav>

      <main className="p-6 bg-gray-50 min-h-screen">
        {page === "projects" && <Projects />}
        {page === "tasks" && <Tasks />}
        {page === "kanban" && <Kanban />}
      </main>
    </div>
  );
}
