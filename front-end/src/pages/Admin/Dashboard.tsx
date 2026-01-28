import React from "react";
import { FaUsers, FaTools, FaChartLine, FaCogs, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Dashboard Admin de (user.name)</h1>
        <div className="flex items-center gap-4">
          <button
            // onClick={onLogout}
            className="flex items-center gap-2 bg-white text-primary font-medium px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Utilisateurs */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <FaUsers className="text-4xl text-accent" />
              <div>
                <h2 className="text-xl font-semibold">Liste Utilisateurs</h2>
                <p className="text-gray-500 text-sm">Voir et gérer tous les utilisateurs</p>
              </div>
            </div>
          </div>

          {/* Équipements */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <FaTools className="text-4xl text-accent" />
              <div>
                <h2 className="text-xl font-semibold">Liste Équipements</h2>
                <p className="text-gray-500 text-sm">Gérer le matériel disponible</p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <FaChartLine className="text-4xl text-accent" />
              <div>
                <h2 className="text-xl font-semibold">Statistiques</h2>
                <p className="text-gray-500 text-sm">Voir les performances de la plateforme</p>
              </div>
            </div>
          </div>

          {/* Paramètres */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center gap-4">
              <FaCogs className="text-4xl text-accent" />
              <div>
                <h2 className="text-xl font-semibold">Paramètres</h2>
                <p className="text-gray-500 text-sm">Configurer les options de la plateforme</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
