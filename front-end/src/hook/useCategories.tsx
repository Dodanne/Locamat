import api from "../api/axios";

export function useCategories (){
    
    async function getCategories () {
    try {
      const res = await api.get(`/category`);
      return res.data
    } catch (err) {
      console.log(err)
      return []
    }
  };

    return { getCategories}
}