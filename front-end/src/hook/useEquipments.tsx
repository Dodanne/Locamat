import api from "../api/axios";

export type SearchParams = {
  q?: string
  categories?: number[]
  maxPrice?: number
};


export function useEquipment(){
    
    async function getEquipmentById (id: string|undefined) {
    try {
      const res = await api.get(`/equipment/${id}`);
      return res.data
    } catch (err) {
      console.log(err)
  };
    }

    async function getEquipment6First ()  {
    try {
      const res = await api.get(`/equipment6first`);
      return res.data
    } catch (err) {
      console.log(err)
    } 
    }

    async function getSearchEquipment(params: SearchParams) {
        try{
    const query = new URLSearchParams();

    if (params.q) query.append("q", params.q);
    if (params.maxPrice) query.append("maxPrice", String(params.maxPrice));
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach((cat) => query.append("categories", String(cat)));
    }

    const res = await api.get(`/equipments/search?${query.toString()}`);
    console.log(res.data)
    return res.data
    } catch (err){
        console.log(err)
    }
    }

         return {getEquipment6First,getEquipmentById, getSearchEquipment}
}