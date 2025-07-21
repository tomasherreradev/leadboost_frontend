import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaInstagram, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function InstagramCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const status = searchParams.get('status');
  const message = searchParams.get('message');

  useEffect(() => {
    // Redirigir después de 3 segundos
    const timer = setTimeout(() => {
      navigate('/settings/sincro-networks');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'success' ? (
            <>
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Instagram conectado exitosamente!
              </h1>
              <p className="text-gray-600 mb-6">
                Tu cuenta de Instagram ha sido sincronizada correctamente.
              </p>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Error al conectar Instagram
              </h1>
              <p className="text-gray-600 mb-6">
                {message || 'Hubo un problema al conectar tu cuenta de Instagram.'}
              </p>
            </>
          )}
          
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <FaInstagram className="text-pink-500" />
            <span>Instagram</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Redirigiendo en 3 segundos...
          </p>
        </div>
      </div>
    </div>
  );
} 