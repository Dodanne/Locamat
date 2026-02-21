import { useState } from "react";
import api from "../api/axios";
import { Equipment } from "../types/Equipment";
import apiAuth from "../api/axiosAuth";

export type SearchParams = {
  query?: string
  categories?: number[]
  maxPrice?: number
};

export function useEquipment(){
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
    const [equipment, setEquipmentById] = useState<Equipment | null>(null)
    const [equipment6First, setEquipment6First] = useState<Equipment[]>([])
    

    async function getAllEquipment (){
        try{
      const res = await api.get(`/equipment`);
      setEquipmentList(res.data);
    } catch (err){
      console.log(err)
    }
    }

    async function getEquipmentById (id: string) {
    try {
      const res = await api.get(`/equipment/${id}`);
      setEquipmentById (res.data)
    } catch (err) {
      console.log(err)
  };
    }

    async function getEquipment6First ()  {
    try {
      const res = await api.get(`/equipment6first`);
      setEquipment6First(res.data);
    } catch (err) {
      console.log(err)
    } 
    }

    async function postNewEquipment (form: FormData){
    try {
        const res= await  apiAuth.post("/new-equipment", form);
        setEquipmentList(prev => [...prev, res.data]);
        return res.data
    }
    catch (err) {
        console.log(err);
    }
    }

    async function getSearchEquipment(params: SearchParams): Promise<void> {
        try{
    const query = new URLSearchParams();

    if (params.query) query.append("query", params.query);
    if (params.maxPrice) query.append("maxPrice", String(params.maxPrice));
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach((cat) => query.append("categories", String(cat)));
    }

    const res = await api.get(`/equipments/search?${query.toString()}`);
    setEquipmentList(res.data);
    } catch (err){
        console.log(err)
    }
    }

    

         return {equipment, equipment6First, equipmentList, getAllEquipment, getEquipment6First,getEquipmentById, getSearchEquipment, postNewEquipment}
}