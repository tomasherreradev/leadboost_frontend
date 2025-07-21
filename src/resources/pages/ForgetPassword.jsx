import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';

export default function ForgetPassword() {
  const { forgotPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setMessage(result.message);
        setEmail('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al enviar el email de recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="LeadBost" className="mx-auto max-w-xs w-full object-contain" />
        </div>
        <h1 className="text-center text-2xl font-semibold mb-6">Recuperar contraseña</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setMessage('');
              }}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          <a href="/" className="text-blue-600 hover:underline">
            Volver al login
          </a>
        </p>
      </div>
    </div>
  );
}
