import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaWhatsapp, FaArrowLeft, FaCheck } from "react-icons/fa";

export default function WhatsappSetup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const state = searchParams.get('state');
    if (!state) {
      navigate('/settings/sincro');
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validar formato del número
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        setError("Por favor ingresa un número de teléfono válido");
        return;
      }

      // Simular verificación (en producción esto iría al backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirigir al callback con el número
      const state = searchParams.get('state');
      const callbackUrl = `${import.meta.env.VITE_APP_BACKEND_API}/social/whatsapp/callback?phoneNumber=${encodeURIComponent(phoneNumber)}&state=${state}`;
      window.location.href = callbackUrl;
      
    } catch (error) {
      setError("Error al verificar el número de WhatsApp");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/settings/sincro');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <FaWhatsapp className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Configurar WhatsApp
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tu número de teléfono para conectar WhatsApp Business
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Número de teléfono
            </label>
            <div className="mt-1">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 234 567 8900"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Incluye el código de país (ej: +1 para Estados Unidos)
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
            >
              <FaArrowLeft className="text-sm" />
              Volver
            </button>
            
            <button
              type="submit"
              disabled={loading || !phoneNumber.trim()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Verificando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaCheck className="text-sm" />
                  Conectar WhatsApp
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            ¿Qué necesitas?
          </h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Un número de teléfono verificado</li>
            <li>• WhatsApp Business API configurado</li>
            <li>• Permisos de administrador en tu cuenta</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 