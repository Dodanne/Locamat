import {Equipment} from "../../types/Equipment"
import { User } from "../../types/User"
import ItemCard from "../Home/ItemCard"
import { FaSearch } from "react-icons/fa";
import Slider from "../../components/Slider"
import { Category } from "../../types/Category";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type ItemCardProps = {
    equipment:Equipment []
    users:User[]
    categories:Category []
}
export default function equipmentSearch ({equipment,categories, users }:ItemCardProps){
    //useStates
    const [selectedCategories, setSelectedCategories] =  useState<number[]>([]);
    const [search,setSearch]=useState("")

    //handleChanges
    function handleChangeSearchBar(e:React.ChangeEvent<HTMLInputElement>){
        setSearch(e.target.value)
    }
        const handleChangeCategory = (e:React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = Number(e.target.value);
        setSelectedCategories((prev) => 
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId): [...prev, categoryId]); 
    }
        //filter => A FAIRE DANS LE BACK
    const filteredItems=equipment.filter((i)=>{
       const filterSearch= i.title.toLowerCase().includes(search.toLowerCase())
       const filterCategory= selectedCategories.length === 0 ||selectedCategories.includes(i.category_id);    
    return filterSearch&& filterCategory 
    })
    

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
                    <input type="text" value={search} onChange={handleChangeSearchBar} className=" w-full h-10 pr-4 pl-10 text-blackText bg-gray-100 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-gray-600" placeholder="Rechercher du matériel..."/>
                </div>
               
            </div>
           {search.trim() !== ""&&(
             <div className="text-gray-600 text-sm">
            {filteredItems.length} resultats trouvés
            </div>)}
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
                                      <input type="checkbox"  value={cat.category_id}  checked={selectedCategories.includes(cat.category_id)} onChange={handleChangeCategory} />
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
                        const user = users.find((u) => u.user_id === i.owner_id);
                        if (!user) return null; 
                        return <Link to={`/equipment/${i.equipment_id}`}><ItemCard key={i.equipment_id} equipment={i} user={user}/></Link>
                    })
                    }
                </div>
            </div>
        </div>
       </div>
        
    )
}