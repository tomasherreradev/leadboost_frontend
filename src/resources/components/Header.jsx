import React from "react";
import { FaSearch, FaQuestionCircle, FaBell, FaCog } from "react-icons/fa";

export default function Header({ pageTitle = "Página" }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="mx-auto flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
          <nav className="flex items-center gap-2 text-gray-500 text-sm mt-1 select-none">
            <span>LeadBoost</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
            <span>{pageTitle}</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative text-gray-400">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            title="Ayuda"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <FaQuestionCircle size={20} />
          </button>

          <button
            title="Notificaciones"
            className="relative text-gray-600 hover:text-gray-800 transition"
          >
            <FaBell size={20} />
            <span className="absolute bottom-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              3
            </span>
          </button>

          <button
            title="Configuración rápida"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <FaCog size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
