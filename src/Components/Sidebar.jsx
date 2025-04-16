import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiUserPlus, FiUsers, FiHome } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    {
      to: "/admin-dashboard",
      icon: <FiHome className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      to: "/add-Faculty",
      icon: <FiUserPlus className="w-5 h-5" />,
      label: "Add Faculty",
    },
    {
      to: "/faculty-list",
      icon: <FiUsers className="w-5 h-5" />,
      label: "Faculty List",
    },
    {
      to: "/add-course",
      icon: <FiUsers className="w-5 h-5" />,
      label: "Add Course",
    },
    {
      to: "/add-jobs",
      icon: <FiUsers className="w-5 h-5" />,
      label: "Add Jobs / Internships",
    }

    // add add course, 
  ];

  return (
    <aside
      className={`min-h-screen bg-white shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col px-4 py-6`}
      aria-label="Sidebar navigation"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 mb-6 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
        title={isOpen ? "Collapse menu" : "Expand menu"}
      >
        {isOpen ? (
          <FiX className="w-6 h-6 text-blue-600" />
        ) : (
          <FiMenu className="w-6 h-6 text-blue-600" />
        )}
      </button>

      {/* Navigation Menu */}
      <nav className={`${isOpen ? "block" : "hidden"} flex-1`}>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
                end
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
