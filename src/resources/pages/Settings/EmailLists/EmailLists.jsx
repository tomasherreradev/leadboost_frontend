import { useEffect, useState } from "react";
import { FaHome, FaPlus, FaPencilAlt } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { useAuth } from "../../../../context/AuthContext";

export default function EmailLists() {
  const [nombre, setNombre] = useState("");
  const [observacion, setObservacion] = useState("");
  const [listas, setListas] = useState([]);
  const { user } = useAuth();

  const fetchListas = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/mail-lists`);
      const data = await res.json();
      setListas(data);
    } catch (error) {
      console.error("Error al obtener listas:", error);
    }
  };

  useEffect(() => {
    fetchListas();
  }, []);

  const handleCrearLista = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/mail-lists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          observacion,
          user_id: user.id, // ← reemplazar con ID real del usuario autenticado
        }),
      });
      const nuevaLista = await res.json();
      setListas([...listas, nuevaLista]);
      setNombre("");
      setObservacion("");
    } catch (error) {
      console.error("Error al crear lista:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header pageTitle="Listas de Correo" />

        <main className="p-8">
          <h2 className="text-2xl font-bold mb-4">Crear nueva lista</h2>

          <form
            onSubmit={handleCrearLista}
            className="bg-white p-6 rounded-lg shadow mb-8"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Observación</label>
              <textarea
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <FaPlus />
              Crear Lista
            </button>
          </form>

          <h2 className="text-xl font-semibold mb-2">Tus listas</h2>
          <ul className="bg-white p-4 rounded-lg shadow space-y-2">
            {listas.map((lista) => (
              <li key={lista.id} className="border-b pb-2 flex justify-between">
                <div>
                  <strong>{lista.nombre}</strong> – {lista.observacion}
                </div>
                <a
                  href={`/settings/email-lists/${lista.id}/edit`}
                  className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <FaPencilAlt />
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
