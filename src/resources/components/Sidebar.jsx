import React, { useState } from "react";
import {
  FaChartLine,
  FaNetworkWired,
  FaBullhorn,
  FaCog,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from '../../assets/images/logo.png';

export default function Sidebar({ activePage }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartLine />, href: "/home" },
    { id: "networks", label: "Redes Sociales", icon: <FaNetworkWired />, href: "/networks" },
    { id: "campaigns", label: "Campañas", icon: <FaBullhorn />, href: "/campaigns" },
    { id: "settings", label: "Configuración", icon: <FaCog />, href: "/settings" },
  ];

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-60 p-2 rounded-md bg-white shadow-md text-gray-700 lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
          z-50
        `}
      >
        <div className="p-6 flex justify-center border-b border-gray-200">
          <a href="/home">
            <img
              src={logo}
              alt="LeadBoost"
                className="h-10 object-contain"
              />
          </a>
        </div>
        <ul className="flex flex-col flex-grow p-4 space-y-1">
          {menuItems.map(({ id, label, icon, href }) => {
            const isActive = activePage === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "text-blue-600 font-semibold border-l-4 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)} // cerrar menu móvil al click
                >
                  {icon}
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
            <FaUser size={18} />
            <span>Mi Cuenta</span>
          </button>
        </div>
      </nav>
    </>
  );
}
