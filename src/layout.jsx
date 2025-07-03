// src/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="flex justify-center space-x-6 bg-blue-700 text-white p-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/projects" className="hover:underline">Projets</Link>
        <Link to="/tasks" className="hover:underline">Tâches</Link>
        <Link to="/kanban" className="hover:underline">Kanban</Link>
      </nav>
      <main className="p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
