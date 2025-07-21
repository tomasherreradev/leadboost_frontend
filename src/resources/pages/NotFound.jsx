import {
    FaHome,
  } from "react-icons/fa";
  import { useState } from "react";
  import Sidebar from "../components/Sidebar";
  import Header from "../components/Header";
  
  export default function NotFound() {
    const [notificationsCount] = useState(3);
  
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar activePage="dashboard" />
  
        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <Header pageTitle="404" />
  
          {/* Error content */}
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">Página no encontrada</h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaHome />
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  function ChevronRight(props) {
    return (
      <svg
        {...props}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 5l7 7-7 7"></path>
      </svg>
    );
  }
  