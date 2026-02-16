import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Category } from "../types/Category";
import api from "./../api/axios"


type CategoryContextType = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
   
    try {
      const res = await api.get(`/category`);
      setCategories(res.data); 
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{categories,fetchCategories,}}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
 
