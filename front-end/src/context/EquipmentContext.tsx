import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Equipment } from "../types/Equipment";
import api from "./../api/axios"
import apiAth from "./../api/axiosAuth"

type EquipmentContextType = {
  equipmentList: Equipment[];
  equipment6First: Equipment[];
  fetchEquipments: () => Promise<void>;
  fetchEquipment6First: () => Promise<void>;
  fetchEquipmentById: (id: string) => Promise<Equipment | null>;
  fetchNewEquipment: (form:FormData)=>Promise <Equipment| undefined>
  fetchSearchEquipment: (params: SearchParams) => Promise<Equipment[]>;
};
export type SearchParams = {
  query?: string;
  categories?: number[];
  maxPrice?: number;
};
const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [equipment6First, setEquipment6First] = useState<Equipment[]>([]);

  //tous les équipments

  const fetchEquipments= async () => {
    try{
      const res = await api.get(`/equipment`);
      setEquipmentList(res.data);
    } catch (err){
      console.log(err)
    }
  };

  //les 6 premiers équipments

  async function fetchEquipment6First ()  {
    try {
      const res = await api.get(`/equipment6first`);
      setEquipment6First(res.data);
    } catch (err) {
      console.log(err)
    } 
  };
  // equipment by Id
  async function fetchEquipmentById (id: string) {
    try {
      const res = await api.get(`/equipment/${id}`);
      return res.data
    } catch (err) {
      console.log(err)
  };
  }

  async function fetchNewEquipment (form: FormData){
    try {
   const res= await  apiAth.post("/new-equipment", form);
        setEquipmentList(prev => [...prev, res.data]);
        return res.data
    }
    catch (err) {
        console.log(err);
    }
    }

  async function fetchSearchEquipment(params: SearchParams): Promise<Equipment[]> {
    const query = new URLSearchParams();

    if (params.query) query.append("query", params.query);
    if (params.maxPrice) query.append("maxPrice", String(params.maxPrice));
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach((cat) => query.append("categories", String(cat)));
    }

    const res = await api.get(`/equipments/search?${query.toString()}`);
    setEquipmentList(res.data);
    return res.data;
  }
  
    //demarrage de l'app
    useEffect(() => { 
    fetchEquipments();
    fetchEquipment6First(); 
  }, []);
  
  return (
    <EquipmentContext.Provider
      value={{
        equipmentList,
        equipment6First,
        fetchEquipments,
        fetchEquipment6First,
        fetchEquipmentById,
        fetchNewEquipment,
        fetchSearchEquipment
      }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = (): EquipmentContextType => {
  const context = useContext(EquipmentContext);
  if (!context) { throw new Error();}
  return context;
}
  

