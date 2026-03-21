import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';
import { User } from '../../types/User';
import { AdminsApi } from '../../services/AdminApi';
import FormatDate from '../FormatDate';

export default function ListeAdministrateurs() {
  const [admin, setAdmin] = useState<User[]>([]);
  const { deleteAdmin, getAdmins } = AdminsApi();
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const data = await getAdmins();
        setAdmin(data || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (userId: number) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir remettre le rôle de "user" à cet administrateur ? Celui-ci perdra tous ses droits`,
      )
    )
      return;
    try {
      await deleteAdmin(userId);
      setAdmin((prev) => prev.filter((a) => a.user_id !== userId));
    } catch (err) {
      console.log(err);
      setError("Impossible de supprimer l'administrateur");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold mb-4">Liste des administrateurs </h2>
        <button className="btn bg-accent text-white p-2 ">
          {' '}
          <TiPlus /> Ajouter un admin{' '}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-2 border whitespace-nowrap">Nom</th>
            <th className="py-2 px-2 border whitespace-nowrap">Prénom</th>
            <th className="py-2 px-2 border whitespace-nowrap">Email</th>
            <th className="py-2 px-2 border whitespace-nowrap">Type utilisateur</th>
            <th className="py-2 px-2 border whitespace-nowrap">Société</th>
            <th className="py-2 px-2 border whitespace-nowrap">SIRET</th>
            <th className="py-2 px-2 border whitespace-nowrap">Statut</th>
            <th className="py-2 px-2 border whitespace-nowrap">Créé le</th>
            <th className="py-2 px-2 border whitespace-nowrap">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((a) => (
            <tr key={a.user_id} className="hover:bg-gray-50">
              <td className="py-2 px-2 border whitespace-nowrap">{a.last_name}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{a.first_name}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{a.email}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{a.user_type}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{a.compagny_name || '-'}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{a.siret || '-'}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{a.status}</td>
              <td className="py-2 px-2 border whitespace-nowrap">{FormatDate(a.createdAt)}</td>
              <td className="py-2 px-2 border text-center">
                <button
                  onClick={() => handleDeleteAdmin(a.user_id)}
                  className="flex items-center gap-1 mx-auto text-red-600 hover:text-red-800"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
