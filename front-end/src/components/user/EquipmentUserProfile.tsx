import ItemCard from "../ItemCard"
import { useEffect, useState } from "react";
import { Equipment } from "../../types/Equipment";
import apiAuth from "../../api/axiosAuth";
import AddEquipmentBtn from "../AddEquipmentBtn";
import { useAuth } from "../../context/AuthContext";

export default function EquipmentUserProfile(){
  const [userEquipments,setUserEquipments]=useState<Equipment[]>([])
  const {user_id}=useAuth()
  
     useEffect(() => {
            async function fetchUserEquipments() {
                try {
                    const res = await apiAuth.get(`/user/${user_id}/equipment`);
                    setUserEquipments(Array.isArray(res.data) ? res.data : []);
                } catch (err) {
                    console.log(err);
                }
            }
            fetchUserEquipments();
        }, [user_id]);

         const handleDeleteEquipment = async (id: number) => {
          if (!confirm("Supprimer cet équipement ?")) return;
        
          await apiAuth.delete(`/equipment/${id}`)
          setUserEquipments((prev) =>
            prev.filter((e) => e.equipment_id !== id)
          );
        };   
        
        const handleUpdateEquipment = async (id: number, data: Equipment) => {
          try {
            await apiAuth.put(`/equipment/${id}`)
            setUserEquipments((prev) =>
              prev.map((e) =>
                e.equipment_id === id ? { ...e, ...data } : e
              )
            );
          } catch (error) {
            console.log(error);
            alert("Impossible de mettre à jour l’équipement");
          }
        };
    return(

        <>
                {userEquipments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <p className="text-lg mb-4">  Vous n’avez pas encore commencé à louer. </p>
                        <p className="mb-6"> Commencez dès à présent en ajoutant votre premier matériel </p>
                    <AddEquipmentBtn />
                    </div>
                     ) :(
                         <> 
                     <div className="flex items-center justify-between"> 
                       <h2 className="text-2xl text-gray-900 my-4">Mon matériel</h2>
                       <AddEquipmentBtn/>
                     </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                       {userEquipments.map ((e)=> (
                            <ItemCard key={e.equipment_id} equipment={e}  editable onUpdate={handleUpdateEquipment} onDelete={handleDeleteEquipment} /> 
                        ))}      
                    </div>
                    </>
                     )}
                </>   
                )}
        