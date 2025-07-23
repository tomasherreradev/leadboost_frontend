import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PROVIDERS = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Gmail', value: 'gmail' }
];

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [provider, setProvider] = useState('facebook');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/messages?provider=${provider}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setMessages([]);
      }
      setLoading(false);
    };
    fetchMessages();
  }, [provider]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="messages" />

      <div className="flex flex-col flex-1">
        <Header pageTitle="Mensajes Centralizados" />

        <main className="p-6">
          <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
            <div className="mb-6 flex items-center gap-4">
              <label className="text-gray-700 font-semibold">Proveedor:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={provider}
                onChange={e => setProvider(e.target.value)}
              >
                {PROVIDERS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="text-center text-blue-600 font-semibold">Cargando...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-blue-100 text-gray-800 text-left">
                      <th className="px-4 py-2 border-b border-gray-300">Fecha</th>
                      <th className="px-4 py-2 border-b border-gray-300">Remitente</th>
                      <th className="px-4 py-2 border-b border-gray-300">Contenido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-4 text-gray-500">
                          Sin mensajes
                        </td>
                      </tr>
                    ) : (
                      messages.map(msg => (
                        <tr key={msg.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b border-gray-200">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-200">{msg.sender_name}</td>
                          <td className="px-4 py-2 border-b border-gray-200">{msg.content}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
