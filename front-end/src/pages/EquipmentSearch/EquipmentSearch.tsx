import {Item} from "../../types/item"
import { User } from "../../types/users"
import ItemCard from "../Home/ItemCard"
import { IoFilterSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Slider from "../../components/Slider"
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type ItemCardProps = {
    item:Item []
    users:User[]
    categories:Category []
}
export default function equipmentSearch ({item,categories, users }:ItemCardProps){
    
    const [selectedCategories, setSelectedCategories] =  useState<number[]>([]);
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = Number(e.target.value);
        setSelectedCategories((prev) => 
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId): [...prev, categoryId]); 
    }
    const filteredItems = item.filter((item) => {
        if (selectedCategories.length === 0) {
            return true; 
        }
        return selectedCategories.includes(item.category_id);
});
const [searchParams] = useSearchParams();
  const categorieId = searchParams.get("categorie");


  useEffect(() => {
    if (categorieId) {
       setSelectedCategories([Number(categorieId)]);
      
    }
  }, [categorieId]);

    return(
        // recherche + filtre
       <div className="container py-8">
        <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" className=" w-full h-10 pr-4 pl-10 text-blackText bg-gray-100 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-gray-600" placeholder="Rechercher du matériel..."/>
                </div>
                <button className="flex items-center justify-center gap-2 h-10 px-4 font-semibold rounded-md border border-gray-300 text-sm hover:bg                -gray-100">
                <IoFilterSharp />
                Filtres
                </button>  
            </div>
            <div className="text-gray-600 text-sm">
                "" resultats trouvés
            </div>
        </div>
        {/* Aside Bar */}
        <div className="flex gap-8">
            <aside className="hidden w-80 md:block">
                <div  className="border rounded-lg p-6 space-y-6 bg-white ">
                        <div>
                             {/* categories */}
                            <h3 className="text-lg mb-4 text-gray-900">Catégories</h3>
                             <div className="space-y-3">
                                {categories.map((cat)=>(
                                     <label  key={cat.name} className="flex items-center gap-1 text-sm font-semibold select-none cursor-pointer">
                                      <input type="checkbox"  value={cat.id}  checked={selectedCategories.includes(cat.id)} onChange={handleChange} />
                                        <span>{cat.icon}</span>
                                        <span>{cat.name}</span> 
                                   </label>
                                ))}
                             </div>
                             {/* Prix */}
                             <div>
                                <h3 className="text-lg mt-6 text-gray-900">Prix par jour</h3>
                                <div className="flex justify-between text-sm text-gray-600">
                                  <Slider max={100}/>
                                </div>
                             </div>
                             {/* Distance */}
                             <div>
                                 <h3 className="text-lg mt-6 text-gray-900">Distance maximale</h3>
                                    <Slider max={1000} unit="km"  />
                                 
                             </div>
                             {/* reset */}
                            <button className="w-full mt-6 h-9 rounded-md border text-sm font-medium hover:bg-gray-100">
                                Réinitialiser les filtres
                             </button>
                        </div>
                </div>
            </aside>
            {/* résultats */}
            <div className="flex-1">
                <div className="loop-div">
                    {filteredItems.map ((i)=>  {
                        const user = users.find((u) => u.id === i.owner_id);
                        if (!user) return null; 
                        return <Link to={`/equipment/${i.id}`}><ItemCard key={i.id} item={i} user={user}/></Link>
                    })
                    }
                </div>
            </div>
        </div>
       </div>
        
    )
}