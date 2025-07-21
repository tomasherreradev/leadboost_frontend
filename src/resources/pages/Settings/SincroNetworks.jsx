import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaGoogle,
  FaHome,
  FaLink,
  FaUnlink
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { socialService } from "../../../services/api";

const networks = [
  {
    name: "Facebook",
    description: "Sincroniza tu cuenta de Facebook.",
    icon: <FaFacebookF className="text-blue-600" />,
    bg: "bg-blue-100"
  },
  {
    name: "Instagram",
    description: "Conecta tu perfil de Instagram.",
    icon: <FaInstagram className="text-pink-500" />,
    bg: "bg-pink-100"
  },
  {
    name: "WhatsApp",
    description: "Sincroniza tu número de WhatsApp.",
    icon: <FaWhatsapp className="text-green-500" />,
    bg: "bg-green-100"
  },
  {
    name: "Gmail",
    description: "Conecta tu cuenta de Google.",
    icon: <FaGoogle className="text-red-500" />,
    bg: "bg-red-100"
  }
];

export default function SincroNetworks() {
  const [notificationsCount] = useState(3);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFacebookStatus();
    checkGmailStatus();
    checkWhatsappStatus();
  }, []);

  const checkFacebookStatus = async () => {
    try {
      const status = await socialService.getFacebookStatus();
      console.log('Estado completo de Facebook:', status);
      console.log('status.facebook:', status.facebook);
      console.log('status.instagram:', status.instagram);
      // El backend devuelve { facebook: true/false, instagram: true/false }
      setFacebookConnected(status.facebook);
      setInstagramConnected(status.instagram);
    } catch (error) {
      console.error('Error al verificar estado de Facebook:', error);
    }
  };

  const checkGmailStatus = async () => {
    try {
      const status = await socialService.getGmailStatus();
      console.log('Estado de Gmail:', status);
      setGmailConnected(status.connected);
    } catch (error) {
      console.error("Error al verificar estado de Gmail:", error);
    }
  };

  const checkWhatsappStatus = async () => {
    try {
      const status = await socialService.getWhatsappStatus();
      console.log('Estado de WhatsApp:', status);
      setWhatsappConnected(status.connected);
    } catch (error) {
      console.error("Error al verificar estado de WhatsApp:", error);
    }
  };

  const handleFacebookConnect = async () => {
    try {
      setLoading(true);
      const { authUrl } = await socialService.getFacebookAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error al conectar Facebook:', error.response?.data || error.message);
      alert('Error al conectar con Facebook');
    } finally {
      setLoading(false);
    }
  };

  const handleGmailConnect = async () => {
    try {
      setLoading(true);
      const { authUrl } = await socialService.getGmailAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error al conectar Gmail:", error.response?.data || error.message);
      alert("Error al conectar con Gmail");
    } finally {
      setLoading(false);
    }
  };

  const handleInstagramConnect = async () => {
    try {
      setLoading(true);
      const { authUrl } = await socialService.getInstagramAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error al conectar Instagram:', error.response?.data || error.message);
      alert('Error al conectar con Instagram');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookDisconnect = async () => {
    try {
      setLoading(true);
      await socialService.disconnectFacebook();
      setFacebookConnected(false);
      alert('Cuenta de Facebook desconectada exitosamente');
    } catch (error) {
      console.error('Error al desconectar Facebook:', error);
      alert('Error al desconectar cuenta de Facebook');
    } finally {
      setLoading(false);
    }
  };

  const handleGmailDisconnect = async () => {
    try {
      setLoading(true);
      await socialService.disconnectGmail();
      setGmailConnected(false);
      alert("Cuenta de Gmail desconectada exitosamente");
    } catch (error) {
      console.error("Error al desconectar Gmail:", error);
      alert("Error al desconectar cuenta de Gmail");
    } finally {
      setLoading(false);
    }
  };

  const handleInstagramDisconnect = async () => {
    try {
      setLoading(true);
      await socialService.disconnectInstagram();
      setInstagramConnected(false);
      alert('Cuenta de Instagram desconectada exitosamente');
    } catch (error) {
      console.error('Error al desconectar Instagram:', error);
      alert('Error al desconectar cuenta de Instagram');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsappConnect = async () => {
    try {
      setLoading(true);
      const { authUrl } = await socialService.getWhatsappAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error al conectar WhatsApp:', error.response?.data || error.message);
      alert('Error al conectar con WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsappDisconnect = async () => {
    try {
      setLoading(true);
      await socialService.disconnectWhatsapp();
      setWhatsappConnected(false);
      alert('Cuenta de WhatsApp desconectada exitosamente');
    } catch (error) {
      console.error('Error al desconectar WhatsApp:', error);
      alert('Error al desconectar cuenta de WhatsApp');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="networks" />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header pageTitle="Mis redes" />

        <main className="p-6 flex flex-col gap-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestionar redes</h1>
            <p className="text-gray-600 mb-6">Aquí puedes gestionar y sincronizar tus redes sociales conectadas a tu cuenta.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {networks.map(({ name, description, icon, bg }) => {
                const isFacebook = name === "Facebook";
                const isInstagram = name === "Instagram";
                const isGmail = name === "Gmail";
                const isWhatsapp = name === "WhatsApp";
                const isConnected = isFacebook ? facebookConnected : isInstagram ? instagramConnected : isGmail ? gmailConnected : isWhatsapp ? whatsappConnected : false;
                
                // Debug logs para Facebook
                if (isFacebook) {
                  console.log('Facebook - name:', name);
                  console.log('Facebook - isFacebook:', isFacebook);
                  console.log('Facebook - facebookConnected state:', facebookConnected);
                  console.log('Facebook - isConnected:', isConnected);
                }
                
                return (
                  <div key={name} className={`flex items-start gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition ${bg} ${isConnected ? 'ring-2 ring-green-500' : ''}`}>
                    <div className="text-3xl">{icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{name}</h2>
                        {(isFacebook || isInstagram || isGmail || isWhatsapp) && (
                          <div className="flex items-center gap-2">
                            {isConnected ? (
                              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                <FaLink className="text-xs" />
                                Conectado
                              </span>
                            ) : (
                              <span className="text-gray-500 text-sm">No conectado</span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{description}</p>
                      
                      {isFacebook && (
                        <div className="flex gap-2">
                          {isConnected ? (
                            <button
                              onClick={handleFacebookDisconnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                            >
                              <FaUnlink />
                              Desconectar
                            </button>
                          ) : (
                            <button
                              onClick={handleFacebookConnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
                            >
                              <FaLink />
                              Conectar
                            </button>
                          )}
                        </div>
                      )}

                      {isInstagram && (
                        <div className="flex gap-2">
                          {isConnected ? (
                            <button
                              onClick={handleInstagramDisconnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                            >
                              <FaUnlink />
                              Desconectar
                            </button>
                          ) : (
                            <button
                              onClick={handleInstagramConnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-pink-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-pink-700 transition disabled:opacity-50"
                            >
                              <FaLink />
                              Conectar
                            </button>
                          )}
                        </div>
                      )}

                      {isGmail && (
                        <div className="flex gap-2">
                          {isConnected ? (
                            <button
                              onClick={handleGmailDisconnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                            >
                              <FaUnlink />
                              Desconectar
                            </button>
                          ) : (
                            <button
                              onClick={handleGmailConnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                            >
                              <FaLink />
                              Conectar
                            </button>
                          )}
                        </div>
                      )}

                      {isWhatsapp && (
                        <div className="flex gap-2">
                          {isConnected ? (
                            <button
                              onClick={handleWhatsappDisconnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                            >
                              <FaUnlink />
                              Desconectar
                            </button>
                          ) : (
                            <button
                              onClick={handleWhatsappConnect}
                              disabled={loading}
                              className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-600 transition disabled:opacity-50"
                            >
                              <FaLink />
                              Conectar
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                href="/home"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <FaHome />
                Volver al Inicio
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
