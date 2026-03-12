import { createContext, useContext, useState,  ReactNode, useEffect } from "react";
import { Equipment } from "../types/Equipment";
import api from "./../api/axios"
import apiAth from "./../api/axiosAuth"
import apiAuth from "./../api/axiosAuth";

type EquipmentContextType = {
  equipments: Equipment[]
  userEquipments: Equipment []
  getEquipments: () => Promise<void> 
  postNewEquipment: (form:FormData)=>Promise <Equipment| undefined>
  deleteEquipment:(id:number)=>Promise <void>
  deleteEquipmentByAdmin:(id:number)=>Promise <void>
  patchEquipment: (id: number, formData: FormData)=>Promise <Equipment >
  getUserEquipments: (id: number)=>Promise <void>
};
export type SearchParams = {
  query?: string
  categories?: number[]
  maxPrice?: number
};
const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined)

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [userEquipments, setUserEquipments] = useState<Equipment []>([])

    async function getEquipments ()  {
    try{
      const res = await api.get(`/equipment`);
      setEquipments(res.data);
      return res.data
    } catch (err){
      console.log(err)
      return []
    }
  };

  async function postNewEquipment (form: FormData){
    try {
   const res= await  apiAth.post("/new-equipment", form);
        setEquipments(prev => [...prev, res.data]);
        return res.data
    }
    catch (err) {
        console.log(err);
        throw err
    }
    }

  async function deleteEquipment (id:number){
      try {
       await apiAuth.delete(`/equipment/${id}`)
        setEquipments((prev) => prev.filter((e) => e.equipment_id !== id));
         //liste userProfile
        setUserEquipments((prev) =>prev.filter((e) => e.equipment_id !== id));
        alert("Équipement supprimé avec succès !");
       } catch (err) {
         console.log(err);
        alert("Erreur lors de la suppression.");
       }
     }
     
     async function deleteEquipmentByAdmin (id:number){
      try {
       await apiAuth.delete(`/equipment/admin/${id}`)
         setEquipments((prev) => prev.filter((e) => e.equipment_id !== id));
         //liste userProfile
        setUserEquipments((prev) =>prev.filter((e) => e.equipment_id !== id));
       } catch (err) {
         console.log(err);
         throw err
       
       }
     }
    
  async function patchEquipment(id:number, formData: FormData){
        try{
        const res = await apiAuth.patch(`/equipment/${id}`, formData)
  
        //liste globale
        setEquipments((prev) =>
              prev.map((e) =>
                e.equipment_id === id ? res.data : e
              )
            )
            //liste userProfile
            setUserEquipments((prev) =>
              prev.map((e) =>
                e.equipment_id === id ? res.data : e
              )
            )
        return res.data
        } catch (err){
        console.log (err)
        throw err
        }
    }
  async function getUserEquipments(id:number) {
                try {
                    const res = await apiAuth.get(`/user/${id}/equipment`);
                    setUserEquipments(Array.isArray(res.data) ? res.data : []);
                } catch (err) {
                    console.log(err);
                               }
    }

    
    
  
  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        userEquipments,
        getEquipments,
        postNewEquipment,
        deleteEquipment, 
        patchEquipment,
        getUserEquipments,
        deleteEquipmentByAdmin,
      }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipmentContext = (): EquipmentContextType => {
  const context = useContext(EquipmentContext);
  if (!context) { throw new Error();}
  return context;
}
  

