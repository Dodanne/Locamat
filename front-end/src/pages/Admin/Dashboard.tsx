import { FaUsers, FaTools, FaChartLine, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListeUtilisateurs from "../../components/admin/ListeUtilisateurs"
import ListeAdministrateurs from "./../../components/admin/ListeAdministrateurs"
import ListeEquipments from "../../components/admin/ListeEquipments";
const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("");

  const renderContent = () => {
    switch(activeTab) {
      case "users":
        return  <ListeUtilisateurs/>
      case "admins":
        return <ListeAdministrateurs/>
      case "equipments":
        return <div><ListeEquipments/></div>;
      case "stats":
        return <div>Statistiques de la plateforme...</div>;
      case "settings":
        return <div>Paramètres de la plateforme...</div>;
      default:
        return (
        <div className="flex justify-center items-center h-full w-full">
          <h3 className="text-center text-xl font-semibold">Bienvenue sur le dashboard</h3>
        </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white flex justify-between items-center p-6 shadow-md">
        <h1 className="text-2xl font-bold">
          Dashboard {user?.role} de {user?.first_name}
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/user-profile">
            <button className="flex items-center gap-2 bg-white text-primary font-medium px-3 py-1 rounded hover:bg-gray-200 transition">
              <FaSignOutAlt /> Retour au profil
            </button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className=" bg-white border-r p-4 space-y-4">
          <button onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-3 p-3 w-full text-left rounded hover:bg-gray-100 transition ${
                    activeTab === "users" ? "bg-gray-200 font-semibold" : ""
                  }`}>
            <FaUsers /> Utilisateurs
          </button>

          {user?.role === "SUPER-ADMIN" && (
            <button onClick={() => setActiveTab("admins")}
                    className={`flex items-center gap-3 p-3 w-full text-left rounded hover:bg-gray-100 transition ${
                      activeTab === "admins" ? "bg-gray-200 font-semibold" : ""
                    }`}>
              <FaUsers /> Administrateurs
            </button>
          )}

          <button onClick={() => setActiveTab("equipments")}
                  className={`flex items-center gap-3 p-3 w-full text-left rounded hover:bg-gray-100 transition ${
                    activeTab === "equipments" ? "bg-gray-200 font-semibold" : ""
                  }`}>
            <FaTools /> Équipements
          </button>

          <button onClick={() => setActiveTab("stats")}
                  className={`flex items-center gap-3 p-3 w-full text-left rounded hover:bg-gray-100 transition ${
                    activeTab === "stats" ? "bg-gray-200 font-semibold" : ""
                  }`}>
            <FaChartLine /> Statistiques
          </button>

          <button onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 p-3 w-full text-left rounded hover:bg-gray-100 transition ${
                    activeTab === "settings" ? "bg-gray-200 font-semibold" : ""
                  }`}>
            <FaCogs /> Paramètres
          </button>
        </aside>

        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
