import { Link } from "react-router-dom";
import { useCategories } from "../../hook/useCategories";
import { useEffect, useState} from "react";
import { Category } from "../../types/Category";


export default function CategoriesItems() {
  const { getCategories } = useCategories()
   const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(()=>{
    async function fetchCategories(){
      try {
      const data= await getCategories()
      setCategories(data||[])
    } catch (err) {
      console.log(err)
    }}
    fetchCategories()
  },[])
  
  return (
    <div className="section-white">
      <div className="container-max">
        <h2 className="section-title">Parcourir par catégorie</h2>
        <div className="mx-auto px-4 grid grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-8 
        gap-6 justify-items-center max-w-full">
          {categories.map((category) => (
            <Link className="w-full" key={category.category_id} to={`/rechercher?categorie=${category.category_id}`}>
              <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl hover:bg-gray-100 transition-colors  h-full cursor-pointer">
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm text-gray-700 text-center mt-2">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}