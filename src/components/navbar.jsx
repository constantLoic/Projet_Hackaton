// src/components/navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center space-x-6 bg-blue-700 text-white p-4">
      <Link to="/projects" className="hover:underline">Projets</Link>
      <Link to="/tasks" className="hover:underline">Tâches</Link>
      <Link to="/kanban" className="hover:underline">Kanban</Link>
    </nav>
  );
}
