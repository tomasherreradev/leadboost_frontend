import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaFacebookF, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function FacebookCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const statusParam = searchParams.get('status');
        const messageParam = searchParams.get('message');
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage('Error al conectar con Facebook: ' + error);
          return;
        }

        if (statusParam === 'error') {
          setStatus('error');
          setMessage(messageParam || 'Error al conectar con Facebook');
          return;
        }

        if (statusParam === 'success') {
          setStatus('success');
          setMessage('Cuenta de Facebook conectada exitosamente');
          
          // Redirigir después de 3 segundos
          setTimeout(() => {
            navigate('/settings/networks');
          }, 3000);
          return;
        }

        // Si no hay parámetros de estado, verificar si hay código
        if (!code) {
          setStatus('error');
          setMessage('Código de autorización no recibido');
          return;
        }

        // El backend manejará el callback automáticamente
        setStatus('success');
        setMessage('Cuenta de Facebook conectada exitosamente');

        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate('/settings/networks');
        }, 3000);

      } catch (error) {
        console.error('Error en callback de Facebook:', error);
        setStatus('error');
        setMessage('Error inesperado al conectar con Facebook');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Conectando con Facebook</h2>
              <p className="text-gray-600">Procesando autorización...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Conectado!</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">Redirigiendo a la página de redes...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Error de conexión</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => navigate('/settings/networks')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Volver a redes
              </button>
            </>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-blue-600">
            <FaFacebookF />
            <span className="text-sm font-medium">Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
} 