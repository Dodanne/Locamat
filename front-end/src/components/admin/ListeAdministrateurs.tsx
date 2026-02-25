import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { User } from "../../types/User";
import { useAdmins } from "../../hook/useAdmin";


export default function ListeAdministrateurs() {
  const [admin, setAdmin] = useState<User[]>([]);
  const { deleteAdmin, getAdmins}=useAdmins()

  useEffect(() => {
    async function fetchAdmins(){
      try{
        const data= await getAdmins();
        setAdmin(data||[])
      }catch(err){
        console.log(err)
      }
    }fetchAdmins()
  }, [getAdmins]);

   const handleDeleteAdmin = async (userId: number) => {
    if (!confirm(`Êtes-vous sûr de vouloir remettre le rôle de "user" à cet administrateur ? Celui-ci perdra tous ses droits`)) return;
     try{ 
    await deleteAdmin(userId)
    setAdmin(prev => prev.filter(a => a.user_id !== userId))
     }catch(err){
      console.log(err)
     }
};

  return (
  <div className="overflow-x-auto">
    <div className="flex items-center justify-between mb-2">
    <h2 className="text-2xl font-semibold mb-4">Liste des administrateurs </h2>
     <button className="btn bg-accent text-white p-2 relative"> <TiPlus/> Ajouter un admin </button>
    </div>
    <table className="min-w-full bg-white border rounded shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-2 border">Nom</th>
          <th className="py-2 px-2 border">Prénom</th>
          <th className="py-2 px-2 border">Email</th>  
          <th className="py-2 px-2 border">Type utilisateur</th>
          <th className="py-2 px-2 border">Société</th>
          <th className="py-2 px-2 border">SIRET</th>
          <th className="py-2 px-2 border">Statut</th>
          <th className="py-2 px-2 border">Créé le</th>
          <th className="py-2 px-2 border">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        {admin.map(a => (
          <tr key={a.user_id} className="hover:bg-gray-50">
            <td className="py-2 px-2 border">{a.last_name}</td>
            <td className="py-2 px-2 border">{a.first_name}</td>
            <td className="py-2 px-2 border">{a.email}</td>
            <td className="py-2 px-2 border">{a.user_type}</td>
            <td className="py-2 px-2 border">{a.compagny_name || "-"}</td>
            <td className="py-2 px-2 border">{a.siret || "-"}</td>
            <td className="py-2 px-2 border">{a.status}</td>
            <td className="py-2 px-2 border">{new Date(a.createdAt).toLocaleDateString()}</td>
            <td className="py-2 px-2 border text-center">
             <button  onClick={() => handleDeleteAdmin(a.user_id,)} className="flex items-center gap-1 mx-auto text-red-600 hover:text-red-800" >
              <MdDelete /></button></td>  
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
