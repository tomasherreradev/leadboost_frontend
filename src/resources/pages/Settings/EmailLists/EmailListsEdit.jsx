import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function EditEmailList() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/api/mail-lists/${id}/emails`);
      const data = await res.json();
      setEmails(data);
    } catch (error) {
      console.error("Error al obtener emails:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [id]);

  const handleAgregarEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/api/mail-lists/${id}/emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const nuevoEmail = await res.json();
      setEmails([...emails, nuevoEmail]);
      setEmail("");
    } catch (error) {
      console.error("Error al agregar email:", error);
    }
  };

  const handleEliminarEmail = async (emailId) => {
    try {
      await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/api/mail-lists/${id}/emails/${emailId}`, {
        method: "DELETE",
      });
      fetchEmails();
    } catch (error) {
      console.error("Error al eliminar email:", error);
    }
  };

  const descargarPlantilla = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["email"], ["correo@ejemplo.com"]]);
    XLSX.utils.book_append_sheet(wb, ws, "Emails");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "plantilla_emails.xlsx");
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

      const emailsImportados = json.map((row) => row.email).filter((email) => !!email);

      for (const correo of emailsImportados) {
        await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/api/mail-lists/${id}/emails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: correo }),
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
          <form onSubmit={handleAgregarEmail} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresar email"
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

          <h2 className="text-xl font-semibold mb-2">Emails en la lista</h2>
          <ul className="bg-white p-4 rounded-lg shadow space-y-2">
            {emails.map((item) => (
              <li key={item.id} className="border-b pb-2 flex justify-between items-center">
                {item.email}
                <button
                  onClick={() => handleEliminarEmail(item.id)}
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
