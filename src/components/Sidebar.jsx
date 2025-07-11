import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  // Array of sidebar links
  const sidebarLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: 'chart-pie' },
    { path: '/users', name: 'Users', icon: 'users' },
    { path: '/tasks', name: 'Tasks', icon: 'clipboard-list' },
    { path: '/transactions', name: 'Transactions', icon: 'credit-card' }
  ];

  return (
    <div className="fixed top-[60px] left-0 w-[232px] h-[calc(100vh-60px)] bg-white border-l border-gray-200 shadow-md z-40 transition-all duration-300">
      <div className="flex flex-col h-full py-6">
        <nav className="flex-1">
          <ul className="space-y-1 px-2">
            {sidebarLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">
                    <i className={`fas fa-${link.icon}`}></i>
                  </span>
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
