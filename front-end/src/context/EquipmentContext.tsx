import { createContext, useContext, useState,  ReactNode } from "react";
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
  putEquipment: (id: number, data: Equipment)=>Promise <void>
  patchEquipment: (id: number, formData: FormData)=>Promise <Equipment >
  getUserEquipments: (id: string)=>Promise <void>
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
    } catch (err){
      console.log(err)
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
    }
    }

  async function deleteEquipment (id:number){
      try {
       await apiAuth.delete(`/equipment/${id}`)
        setEquipments((prev) => prev.filter((e) => e.equipment_id !== id));
        alert("Équipement supprimé avec succès !");
       } catch (err) {
         console.log(err);
        alert("Erreur lors de la suppression.");
       }
     }
    
  async function putEquipment (id: number, data: Equipment){
         try {
            await apiAuth.put(`/equipment/${id}`,data)
            setEquipments((prev) =>
              prev.map((e) =>
                e.equipment_id === id ? { ...e, ...data } : e
              )
            );
          } catch (err) {
            console.log(err);
          }
        
    }

  async function patchEquipment(id:number, formData: FormData){
        try{
        const res = await apiAuth.patch(`/equipment/${id}`, formData);
        return res.data
        } catch (err){
        console.log (err)
        }
    }
  async function getUserEquipments(id:string) {
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
        putEquipment,
        patchEquipment,
        getUserEquipments
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
  

