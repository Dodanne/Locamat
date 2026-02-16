import { useEffect, useState } from "react";
import { Equipment } from "../../types/Equipment";
import { MdDelete } from "react-icons/md";
import apiAuth from "../../api/axiosAuth";

export default function ListeEquipments() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const baseUrl=import.meta.env.VITE_BASE_URL
  useEffect(() => {
    async function fetchEquipments() {
      try {
        const res = await apiAuth.get("/equipment");
        setEquipments(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEquipments();
  }, []);

  const handleDeleteEquipment = async (equipmentId: number) => {
    const confirmChoise =  confirm( "Etes-vous sûr de vouloir supprimer cet équipment ?");
    if(!confirmChoise)return
    try {
       await apiAuth.delete(`/equipment/${equipmentId}`)
     setEquipments((prev) => prev.filter((e) => e.equipment_id !== equipmentId));
     alert("Équipement supprimé avec succès !");
   } catch (err) {
     console.log(err);
     alert("Erreur lors de la suppression.");
   }
  };


  return (
    <div className="overflow-x-auto">
    <h2 className="text-2xl font-semibold mb-4">Liste des equipments </h2>
    <table className="min-w-full bg-white border rounded shadow">
      <thead className="bg-gray-100">
        <tr>
            <th className="px-4 py-2 border">Titre</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Prix (€)</th>
            <th className="px-4 py-2 border">Propriétaire</th>
            <th className="px-4 py-2 border">Photo</th>
            <th className="px-4 py-2 border">Créé le</th>
             <th className="py-2 px-2 border">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((e) => (
            <tr key={e.equipment_id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{e.title}</td>
              <td className="px-4 py-2 border">{e.description }</td>
              <td className="px-4 py-2 border">{e.price}</td>
              {/* <Link to=<ListeUtilisateur/> > */}
              <td className="px-4 py-2 border">{e.owner?.first_name} {e.owner?.last_name}</td>
              {/* </Link> */}
              <td className="px-4 py-2 border">
                {e.photo ? (
                  <img
                    src={`${baseUrl}/images/equipments/${e.photo}`}
                    alt={e.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2">{new Date(e.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-2 border text-center">
                           <button  onClick={() => handleDeleteEquipment(e.equipment_id)} className="flex items-center gap-1 mx-auto text-red-600 hover:text-red-800" >
                            <MdDelete /></button></td>  
                        
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
