import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ContactListsEdit() {
  const { id } = useParams();
  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);

  const fetchEmails = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/contact-lists/${id}/contacts`);
      const data = await res.json();
      setNumbers(data);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [id]);

  const handleAgregarNumber = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/contact-lists/${id}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });
      const nuevoNumber = await res.json();
      setNumbers([...numbers, nuevoNumber]);
      setNumber("");
    } catch (error) {
      console.error("Error al agregar contacto:", error);
    }
  };

  const handleEliminarNumber = async (numberId) => {
    try {
      await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/contact-lists/${id}/contacts/${numberId}`, {
        method: "DELETE",
      });
      fetchEmails();
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  const descargarPlantilla = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["contact"], ["1234567890"]]);
    XLSX.utils.book_append_sheet(wb, ws, "Contactos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "plantilla_contactos.xlsx");
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const numbersImportados = json.map((row) => row.number).filter((number) => !!number);

      for (const number of numbersImportados) {
        await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/contact-lists/${id}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number: number }),
        });
      }

      fetchEmails();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header pageTitle={`Editar Lista #${id}`} />

        <main className="p-8 space-y-6">
          <form onSubmit={handleAgregarNumber} className="flex gap-4">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              placeholder="Ingresar contacto"
              className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Agregar
            </button>
          </form>

          <div className="flex items-center gap-4">
            <button onClick={descargarPlantilla} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Descargar plantilla Excel
            </button>

            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
              Importar desde Excel
              <input type="file" accept=".xlsx" onChange={handleImportExcel} className="hidden" />
            </label>
          </div>

          <h2 className="text-xl font-semibold mb-2">Contactos en la lista</h2>
          <ul className="bg-white p-4 rounded-lg shadow space-y-2">
            {numbers.map((item) => (
              <li key={item.id} className="border-b pb-2 flex justify-between items-center">
                {item.number}
                <button
                  onClick={() => handleEliminarNumber(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
