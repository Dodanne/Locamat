import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Category } from "../types/Category";

type CategoryContextType = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchCategories = async () => {
   
    try {
      const res = await fetch(`${baseUrl}/category`);
      const data: Category[] = await res.json();
      setCategories(data); 
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
      }}
    >
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
 
