import { useState } from "react";
import api from "../api/axios";
import { Category } from "../types/Category";


export function useCategories (){

    const [categories, setCategories] = useState<Category[]>([]); 
    
    async function getCategories () {
    try {
      const res = await api.get(`/category`);
      setCategories(res.data); 
    } catch (err) {
      console.log(err)
    }
  };

    return {categories, getCategories}
}