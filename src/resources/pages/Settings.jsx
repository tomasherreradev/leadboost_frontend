import {
  FaUserCog,
  FaEnvelope,
  FaShieldAlt,
  FaLock,
  FaQuestionCircle,
  FaCommentDots,
  FaInfoCircle
} from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const settingsItems = [
  { href: '/settings/contact-list', label: 'Contactos', icon: <FaUserCog className="text-blue-500" /> },
  { href: '/settings/email-lists', label: 'Listas de Correo', icon: <FaEnvelope className="text-yellow-500" /> },
  { href: '/settings/security', label: 'Seguridad', icon: <FaShieldAlt className="text-red-500" /> },
  { href: '/settings/privacy', label: 'Privacidad', icon: <FaLock className="text-purple-500" /> },
  { href: '/settings/help', label: 'Ayuda', icon: <FaQuestionCircle className="text-green-500" /> },
  { href: '/settings/networks', label: 'Mis redes', icon: <FaCommentDots className="text-pink-500" /> },
  { href: '/settings/about', label: 'Acerca de', icon: <FaInfoCircle className="text-gray-600" /> }
];

export default function Settings() {
  const [notificationsCount] = useState(3);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="settings" />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header pageTitle="Configuración" />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Configuración</h2>
              <p className="text-gray-500 mt-1">Administra tu cuenta y preferencias</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {settingsItems.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-4 bg-white rounded-2xl shadow hover:shadow-md transition-all duration-200 p-4 group"
                >
                  <div className="text-2xl group-hover:scale-110 transition-transform">{icon}</div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-800 group-hover:text-blue-600">{label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
