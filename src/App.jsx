import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './resources/pages/Login';
import Home from './resources/pages/Home';
import NotFound from './resources/pages/NotFound';
import Campaigns from './resources/pages/Campaigns';
import Register from './resources/pages/Register';
import ForgetPassword from './resources/pages/ForgetPassword';
import ResetPassword from './resources/pages/ResetPassword';
import Settings from './resources/pages/Settings';
import Account from './resources/pages/Settings/Account';
import EmailLists from './resources/pages/Settings/EmailLists/EmailLists';
import EmailListsEdit from './resources/pages/Settings/EmailLists/EmailListsEdit';
import Security from './resources/pages/Settings/Security';
import Privacy from './resources/pages/Settings/Privacy';
import Help from './resources/pages/Settings/Help';
import SincroNetworks from './resources/pages/Settings/SincroNetworks';
import About from './resources/pages/Settings/About';
import FacebookCallback from './resources/pages/FacebookCallback';
import InstagramCallback from './resources/pages/InstagramCallback';
import WhatsappSetup from './resources/pages/WhatsappSetup';
import WhatsappCallback from './resources/pages/WhatsappCallback';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  return !isAuthenticated ? children : <Navigate to="/home" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    <Route path="/forget-password" element={<PublicRoute><ForgetPassword /></PublicRoute>} />
    <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

    {/* Rutas protegidas */}
    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/networks" element={<ProtectedRoute><SincroNetworks /></ProtectedRoute>} />
    <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    <Route path="/settings/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
    <Route path="/settings/email-lists" element={<ProtectedRoute><EmailLists /></ProtectedRoute>} />
    <Route path="/settings/email-lists/:id/edit" element={<ProtectedRoute><EmailListsEdit /></ProtectedRoute>} />
    <Route path="/settings/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
    <Route path="/settings/privacy" element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
    <Route path="/settings/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
    <Route path="/settings/networks" element={<ProtectedRoute><SincroNetworks /></ProtectedRoute>} />
    <Route path="/settings/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
    <Route path="/facebook-callback" element={<FacebookCallback />} />
    <Route path="/instagram-callback" element={<InstagramCallback />} />
    <Route path="/whatsapp-setup" element={<WhatsappSetup />} />
    <Route path="/whatsapp-callback" element={<WhatsappCallback />} />

    {/* Ruta 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
