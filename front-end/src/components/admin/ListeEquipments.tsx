import { useEffect, useState } from "react";
import { Equipment } from "../../types/Equipment";
import { MdDelete } from "react-icons/md";
import apiAuth from "../../api/axiosAuth";
import { useEquipmentContext } from "../../context/EquipmentContext";
import FormatDate from "../FormatDate";

export default function ListeEquipments() {
  const {equipments, getEquipments, deleteEquipment}=useEquipmentContext()
  const baseUrl=import.meta.env.VITE_BASE_URL
  useEffect(() => {
   getEquipments()
  }, []);

  const handleDeleteEquipment = async (equipmentId: number) => {
    const confirmChoise =  confirm( "Etes-vous sûr de vouloir supprimer cet équipment ?");
    if(!confirmChoise)return
    deleteEquipment(equipmentId)
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
                    src={e.photo}
                    alt={e.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2">{FormatDate(e.createdAt)}</td>
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
