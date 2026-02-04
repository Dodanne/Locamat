import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Equipment } from "../types/Equipment";

type EquipmentContextType = {
  equipmentList: Equipment[];
  equipment6First: Equipment[];
  fetchEquipments: () => Promise<Equipment[]>;
  fetchEquipment6First: () => Promise<void>;
  fetchEquipmentById: (id: string) => Promise<Equipment | null>;
  fetchNewEquipment: (form:FormData, token:string)=>Promise <Equipment| undefined>
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
   const [searchResults, setSearchResults] = useState<Equipment[]>([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchEquipments = useCallback(async (): Promise<Equipment[]> => {
    try {
      const res = await fetch(`${baseUrl}/equipment`);
      if (!res.ok) throw new Error("Erreur lors du chargement des équipements");
      const data: Equipment[] = await res.json();
      setEquipmentList(data);
      return data;
    } catch (err) {
      console.log(err)
      return [];
    }
  }, [baseUrl]);

  async function fetchEquipment6First ()  {
    try {
      const res = await fetch(`${baseUrl}/equipment6first`);
      if (!res.ok) throw new Error("Erreur lors du chargement des 6 premiers équipements");
      const data: Equipment[] = await res.json();
      setEquipment6First(data);
     
    } catch (err) {
      console.log(err)
    } 
  };

  async function fetchEquipmentById (id: string): Promise<Equipment | null> {
    
    try {
      const res = await fetch(`${baseUrl}/equipment/${id}`);
      if (!res.ok) throw new Error("Erreur lors du chargement de l'équipement");
      const data: Equipment = await res.json();
      return data;
    } catch (err) {
      console.log(err)
      return null
  };
  }

  async function fetchNewEquipment (form: FormData, token:string){
    try {
   const res= await  fetch("http://localhost:3033/new-equipment", {
            method: "POST",
             headers: {
            Authorization: `Bearer ${token}`, 
  },            
            body: form
        });
        const data:Equipment = await res.json();
        setEquipmentList(prev => [...prev, data]);
        return data
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

    const res = await fetch(`${baseUrl}/equipments/search?${query.toString()}`);
    if (!res.ok) throw new Error("Erreur recherche équipements");

    const data: Equipment[] = await res.json();

    setEquipmentList(data);

    return data;
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
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = (): EquipmentContextType => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error();
  }
  return context;
}
  

