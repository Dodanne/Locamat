import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import EquipmentSearch from './pages/EquipmentSearch/EquipmentSearch';
import EquipmentItem from './pages/EquipmentItem/EquipmentItem';
import AddEquipment from './pages/AddEquipment/AddEquipment';
import EquipmentSuccess from './pages/AddEquipment/Succes';
import Connexion from './pages/User/Connexion';
import UserForm from './pages/User/UserForm';
import UserSuccess from './pages/User/Succes';
import UserProfile from './pages/User/UserProfile';
import Deconnexion from './pages/User/Deconnexion';
import ChatPage from './pages/Chat/ChatPage';
import Dashboard from './pages/Admin/Dashboard';
import EmailChecked from './pages/User/EmailChecked';
import Summary from './pages/EquipmentItem/Summary';
import StatusProvider from './contexts/StatusContext';
import PaiementSuccess from './pages/Reservation/SuccesPaiement';
import PaiementFail from './pages/Reservation/FailPaiement';
import NotFound from './pages/Errors/404';
import MentionsLegales from './pages/Legal/MentionsLegales';
import Confidentialite from './pages/Legal/Confidentialite';
import RGPD from './pages/Legal/RGPD';
import CGU from './pages/Legal/CGU';
import Cookies from './pages/Legal/Cookies';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EquipmentProvider>
          <StatusProvider>
            <Header />
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rechercher" element={<EquipmentSearch />} />
                <Route
                  path="/new-equipment"
                  element={
                    <ProtectedRoute>
                      <AddEquipment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/equipment/:id" element={<EquipmentItem />} />
                <Route
                  path="/user-profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/user-profile/:id" element={<UserProfile />} />
                <Route path="/user-form" element={<UserForm />} />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/logout" element={<Deconnexion />} />
                <Route
                  path="/succes"
                  element={
                    <ProtectedRoute>
                      <EquipmentSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route path="/succesUser" element={<UserSuccess />} />
                <Route path="/verify-email" element={<EmailChecked />} />
                <Route
                  path="/summary-rental/:id"
                  element={
                    <ProtectedRoute>
                      <Summary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/paiement-success/:id"
                  element={
                    <ProtectedRoute>
                      <PaiementSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/paiement-cancel"
                  element={
                    <ProtectedRoute>
                      <PaiementFail />
                    </ProtectedRoute>
                  }
                />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/confidentialite" element={<Confidentialite />} />
                <Route path="/RGPD" element={<RGPD />} />
                <Route path="/CGU" element={<CGU />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </StatusProvider>
        </EquipmentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
