import { FaEnvelope, FaWhatsapp, FaInstagram, FaFacebook, FaPlus, FaSignOutAlt, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Home() {
  const [notificationsCount] = useState(3);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="dashboard" />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header pageTitle="Dashboard" />

        {/* Dashboard main */}
        <main className="p-6 overflow-auto">
          {/* Header with button and user info */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-gray-600">Bienvenido, {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/messages" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <FaPaperPlane />
                Mensajes
              </a>

              <a href="/campaigns" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <FaPlus />
                Nueva Campaña
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaSignOutAlt />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<FaEnvelope size={28} className="text-blue-600" />} title="Emails Enviados" number="1,234" />
            <StatCard icon={<FaWhatsapp size={28} className="text-green-500" />} title="Mensajes WhatsApp" number="856" />
            <StatCard icon={<FaInstagram size={28} className="text-pink-600" />} title="Posts Instagram" number="45" />
            <StatCard icon={<FaFacebook size={28} className="text-blue-800" />} title="Posts Facebook" number="67" />
          </div>

          {/* Recent Campaigns & Connected Accounts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <CardWithHeader
              title="Campañas Recientes"
              link={{ href: '/campaigns', text: 'Ver todas' }}
            >
              <CampaignItem
                title="Campaña de Verano"
                description="Email Marketing • Enviada hace 2 días"
                stats={[{ label: '45% apertura' }, { label: '12% clics' }]}
              />
              <CampaignItem
                title="Promoción Flash"
                description="WhatsApp • Enviada hace 5 días"
                stats={[{ label: '89% entrega' }, { label: '34% respuestas' }]}
              />
            </CardWithHeader>

            <CardWithHeader
              title="Cuentas Conectadas"
              link={{ href: '/networks', text: 'Gestionar' }}
            >
              <AccountItem icon={<FaEnvelope />} title="Email Marketing" description="3 cuentas conectadas" />
              <AccountItem icon={<FaWhatsapp />} title="WhatsApp Business" description="1 cuenta conectada" />
              <AccountItem icon={<FaInstagram />} title="Instagram" description="2 cuentas conectadas" />
              <AccountItem icon={<FaFacebook />} title="Facebook" description="2 páginas conectadas" />
            </CardWithHeader>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon, title, number }) {
  return (
    <div className="bg-white rounded-lg p-5 flex items-center gap-4 shadow-sm">
      <div>{icon}</div>
      <div>
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        <p className="text-xl font-bold text-blue-600">{number}</p>
      </div>
    </div>
  );
}

function CardWithHeader({ title, link, children }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {link && (
          <a href={link.href} className="text-blue-600 hover:underline text-sm">{link.text}</a>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function CampaignItem({ title, description, stats }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
      <div>
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex gap-4 text-blue-600 text-sm font-semibold">
        {stats.map((stat, i) => (
          <span key={i}>{stat.label}</span>
        ))}
      </div>
    </div>
  );
}

function AccountItem({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
      <div className="text-blue-600 text-xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

// Icon pequeño para breadcrumb
function FaChevronRight(props) {
  return (
    <svg
      {...props}
      className="w-3 h-3 text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
    </svg>
  );
}
