import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projets' },
  { to: '/collaborators', label: 'Collaborateurs' },
  { to: '/resources', label: 'Ressources' },
  { to: '/notifications', label: 'Notifications' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <nav className="flex flex-col p-4 space-y-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
