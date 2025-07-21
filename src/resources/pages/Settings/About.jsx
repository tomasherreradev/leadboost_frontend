import {
  FaHome,
} from "react-icons/fa";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function About() {
  const [notificationsCount] = useState(3);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage="settings" />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header pageTitle="Acerca de" />

        {/* Error content */}
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-9xl font-extrabold text-blue-600 mb-4">Acerca de</h1>
          <h2 className="text-3xl font-semibold mb-2">LeadBost</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            LeadBost es una plataforma de marketing digital que te ayuda a crear y gestionar tus campañas de marketing.
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

