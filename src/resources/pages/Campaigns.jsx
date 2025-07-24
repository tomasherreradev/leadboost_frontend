import React, { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaCloudUploadAlt,
  FaInfoCircle,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState("facebook");
  const [postType, setPostType] = useState("post");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // Cambia de image a images
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailSubject, setEmailSubject] = useState("");

  // Fetch connected social accounts
  useEffect(() => {
    const fetchSocialAccounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_API}/social-accounts/status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const accounts = [
          {
            provider: "facebook",
            connected: response.data.facebook,
            details: response.data.accounts.facebook,
          },
          {
            provider: "instagram",
            connected: response.data.instagram,
            details: response.data.accounts.instagram,
          },
          {
            provider: "gmail",
            connected: response.data.gmail,
            details: response.data.accounts.gmail,
          },
          {
            provider: "whatsapp",
            connected: response.data.whatsapp,
            details: response.data.accounts.whatsapp,
          },
        ];
        setSocialAccounts(accounts);
      } catch (err) {
        console.error("Error fetching social accounts:", err);
        setError("Error al cargar cuentas sociales");
      }
    };
    fetchSocialAccounts();
  }, []);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset form when changing tabs
    setContent("");
    setImages([]);
    setRecipients([]);
    setPhoneNumber("");
    setEmailSubject("");

    // Set default post type and auto-select account for each tab
    if (tab === "facebook") {
      setPostType("post");
      setSelectedAccounts([]);
    } else if (tab === "email") {
      setPostType("email");
      setSelectedAccounts(["gmail"]);
    } else if (tab === "whatsapp") {
      setPostType("whatsapp");
      setSelectedAccounts(["whatsapp"]);
    }
  };

  // Handle social account selection (only for Facebook/Instagram)
  const handleAccountToggle = (provider) => {
    setSelectedAccounts((prev) => {
      return prev.includes(provider)
        ? prev.filter((acc) => acc !== provider)
        : [...prev, provider];
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files)); // Guarda todas las imágenes seleccionadas
  };

  // Handle recipient input
  const handleRecipientChange = (e) => {
    const value = e.target.value;
    setRecipients(
      value
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!content) {
      setError("El texto es requerido");
      return;
    }

    if (activeTab === "email" && recipients.length === 0) {
      setError("Debe proporcionar al menos un destinatario para emails");
      return;
    }

    if (activeTab === "whatsapp" && !phoneNumber) {
      setError("Debe proporcionar un número de teléfono para WhatsApp");
      return;
    }

    if (selectedAccounts.length === 0) {
      setError("Debe seleccionar al menos una cuenta/canal");
      return;
    }


    console.log("Datos a enviar:", {
      content,
      postType,
      selectedAccounts,
      recipients,
      emailSubject,
      phoneNumber,
      images: images.length > 0 ? images.map(img => img.name).join(', ') : null
    });

    const formData = new FormData();
    formData.append("content", content);
    formData.append("postType", postType);
    formData.append("socialAccounts", JSON.stringify(selectedAccounts));

    if (activeTab === "email") {
      formData.append("recipients", JSON.stringify(recipients));
      formData.append("subject", emailSubject); // <-- Esto ya está correcto
      formData.append("title", emailSubject); // <-- Añadir esto también por si acaso
    }

    if (activeTab === "whatsapp") {
      formData.append("phoneNumber", phoneNumber);
    }

    // Adjuntar todas las imágenes
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API}/posts/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Campaña creada exitosamente");
      // Reset form
      setContent("");
      setImages([]);
      setSelectedAccounts([]);
      setRecipients([]);
      setPhoneNumber("");
      setEmailSubject("");
    } catch (err) {
      console.error("Error creating campaign:", err);
      setError(err.response?.data?.error || "Error al crear la campaña");
    }
  };

  // Size recommendations
  const sizeRecommendations = {
    post: "1080 x 1080 px",
    story: "1080 x 1920 px",
    email: "600 x 800 px (opcional)",
    whatsapp: "800 x 800 px (opcional)",
  };

  // Available post types for each tab
  const getAvailablePostTypes = () => {
    switch (activeTab) {
      case "facebook":
        return [
          { value: "post", label: "Post" },
          { value: "story", label: "Historia (se publica como post en Facebook)" },
        ];
      case "email":
        return [{ value: "email", label: "Email" }];
      case "whatsapp":
        return [{ value: "whatsapp", label: "Mensaje" }];
      default:
        return [];
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="campaigns" />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header pageTitle="Nueva Campaña" />
        <main className="p-8 space-y-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-semibold">Nueva Campaña</h2>
              <p className="text-gray-600">Crea y gestiona tus campañas de marketing</p>
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaPaperPlane />
              Publicar Campaña
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 pb-4 overflow-x-auto">
            {[
              { id: "facebook", label: "Meta", icon: <FaFacebook /> },
              { id: "email", label: "Email", icon: <FaEnvelope /> },
              { id: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`flex items-center gap-2 whitespace-nowrap font-medium px-5 py-2 border-b-2 transition ${
                  activeTab === id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded">{success}</div>
          )}

          {/* Campaign Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Campaign */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Crear Campaña</h3>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="post-type"
                >
                  Tipo de Campaña
                </label>
                <select
                  id="post-type"
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {getAvailablePostTypes().map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Only show accounts selection for Facebook tab */}
              {activeTab === "facebook" && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Cuentas/Canales</h4>
                  <div className="flex gap-4 flex-wrap">
                    {socialAccounts
                      .filter((acc) =>
                        ["facebook", "instagram"].includes(acc.provider)
                      )
                      .map((acc) => (
                        <label
                          key={acc.provider}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAccounts.includes(acc.provider)}
                            onChange={() => handleAccountToggle(acc.provider)}
                            disabled={!acc.connected}
                            className="h-5 w-5 text-blue-600"
                          />
                          <span>
                            {acc.provider.charAt(0).toUpperCase() +
                              acc.provider.slice(1)}
                          </span>
                          {!acc.connected && (
                            <span className="text-red-500">(No conectado)</span>
                          )}
                        </label>
                      ))}
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer relative text-gray-400">
                <FaCloudUploadAlt className="text-4xl mb-3 w-16 h-16" />
                <p className="mb-2 text-center">
                  Arrastra y suelta una imagen aquí o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  id="media-upload"
                  accept="image/*"
                  multiple // <-- Permite seleccionar varias imágenes
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => document.getElementById("media-upload").click()}
                >
                  Seleccionar Imagen
                </button>
                {images.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-600">
                    {images.map((img, idx) => (
                      <li key={idx}>Archivo seleccionado: {img.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded p-3 mt-4 text-gray-600 text-sm">
                <FaInfoCircle className="text-blue-600 w-5 h-5" />
                <p>
                  Tamaño recomendado:{" "}
                  <span className="font-semibold">
                    {sizeRecommendations[postType]}
                  </span>
                </p>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Detalles de la Campaña</h3>
              <form className="space-y-4">
                {activeTab === "email" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Asunto del Email
                      </label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Asunto del email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Destinatarios (separados por comas)
                      </label>
                      <input
                        type="text"
                        value={recipients.join(",")}
                        onChange={handleRecipientChange}
                        placeholder="email1@ejemplo.com, email2@ejemplo.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </>
                )}

                {activeTab === "whatsapp" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Número de Teléfono
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1234567890"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contenido {activeTab !== "facebook" && "(Requerido)"}
                  </label>
                  <textarea
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={
                      activeTab === "facebook"
                        ? "Escribe el texto de tu publicación..."
                        : activeTab === "email"
                        ? "Escribe el contenido del email..."
                        : "Escribe el mensaje de WhatsApp..."
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}