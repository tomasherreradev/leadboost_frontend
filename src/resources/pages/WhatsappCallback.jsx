import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaWhatsapp, FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

export default function WhatsappCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    if (status === 'success') {
      // Mostrar mensaje de éxito
      setTimeout(() => {
        navigate('/networks');
      }, 3000);
    } else {
      // Mostrar mensaje de error
      setTimeout(() => {
        navigate('/networks');
      }, 5000);
    }
  }, [searchParams, navigate]);

  const status = searchParams.get('status');
  const message = searchParams.get('message');
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`mx-auto h-12 w-12 flex items-center justify-center rounded-full ${
            isSuccess ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isSuccess ? (
              <FaCheck className="h-6 w-6 text-green-600" />
            ) : (
              <FaTimes className="h-6 w-6 text-red-600" />
            )}
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isSuccess ? '¡WhatsApp conectado!' : 'Error al conectar WhatsApp'}
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            {isSuccess 
              ? 'Tu cuenta de WhatsApp Business ha sido conectada exitosamente.'
              : message || 'Hubo un problema al conectar tu cuenta de WhatsApp.'
            }
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <FaWhatsapp className="h-8 w-8 text-green-600 mr-3" />
            <span className="text-lg font-medium text-gray-900">WhatsApp Business</span>
          </div>
          
          {isSuccess ? (
            <div className="text-center">
              <p className="text-green-600 text-sm mb-4">
                Ahora puedes enviar mensajes a través de WhatsApp desde tu dashboard.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-xs text-green-700">
                  ✓ Número verificado<br/>
                  ✓ API configurada<br/>
                  ✓ Listo para usar
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-600 text-sm mb-4">
                Verifica que tu número esté correcto y que tengas permisos de administrador.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-xs text-red-700">
                  ✗ Número no verificado<br/>
                  ✗ API no configurada<br/>
                  ✗ Permisos insuficientes
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/networks')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaArrowLeft className="text-sm" />
            Volver a Configuración
          </button>
        </div>
      </div>
    </div>
  );
} 