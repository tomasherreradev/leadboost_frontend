import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API || 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  // Registro
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Solicitar recuperación de contraseña
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Restablecer contraseña
  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

// Servicios de usuarios
export const userService = {
  // Obtener perfil del usuario actual
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Actualizar perfil
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};

// Servicios de redes sociales
export const socialService = {
  // Obtener URL de autorización de Facebook
  getFacebookAuthUrl: async () => {
    const response = await api.get('/social/facebook/auth');
    return response.data;
  },

  // Obtener estado de conexión de Facebook
  getFacebookStatus: async () => {
    const response = await api.get('/social/facebook/status');
    return response.data;
  },

  // Desconectar cuenta de Facebook
  disconnectFacebook: async () => {
    const response = await api.delete('/social/facebook/disconnect');
    return response.data;
  },

  // Obtener URL de autorización de Instagram
  getInstagramAuthUrl: async () => {
    const response = await api.get('/social/instagram/auth');
    return response.data;
  },

  // Obtener estado de conexión de Instagram
  getInstagramStatus: async () => {
    const response = await api.get('/social/instagram/status');
    return response.data;
  },

  // Desconectar cuenta de Instagram
  disconnectInstagram: async () => {
    const response = await api.delete('/social/instagram/disconnect');
    return response.data;
  },

  getGmailAuthUrl: async () => {
    const response = await api.get('/social/gmail/auth');
    return response.data;
  },
  
  getGmailStatus: async () => {
    const response = await api.get('/social/gmail/status');
    return response.data;
  },
  
  disconnectGmail: async () => {
    const response = await api.delete('/social/gmail/disconnect');
    return response.data;
  },

  // Obtener URL de autorización de WhatsApp
  getWhatsappAuthUrl: async () => {
    const response = await api.get('/social/whatsapp/auth');
    return response.data;
  },

  // Obtener estado de conexión de WhatsApp
  getWhatsappStatus: async () => {
    const response = await api.get('/social/whatsapp/status');
    return response.data;
  },

  // Desconectar cuenta de WhatsApp
  disconnectWhatsapp: async () => {
    const response = await api.delete('/social/whatsapp/disconnect');
    return response.data;
  },
  
};

export default api; 