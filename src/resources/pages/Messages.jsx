import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PROVIDERS = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' }
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
        const res = await axios.get(`/api/messages?provider=${provider}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        setMessages([]);
      }
      setLoading(false);
    };
    fetchMessages();
  }, [provider]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2>Mensajes Centralizados</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Proveedor:&nbsp;</label>
        <select value={provider} onChange={e => setProvider(e.target.value)}>
          {PROVIDERS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Remitente</th>
              <th>Contenido</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center' }}>Sin mensajes</td></tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}</td>
                  <td>{msg.sender_id}</td>
                  <td>{msg.content}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
