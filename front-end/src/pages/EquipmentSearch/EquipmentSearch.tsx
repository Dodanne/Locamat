import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ItemCard from "../../components/equipment/ItemCard";
import Slider from "../../components/Slider";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hook/useCategories";
import { Category } from "../../types/Category";
import { useEquipment } from "../../hook/useEquipments";
import { Equipment } from "../../types/Equipment";
import { useEquipmentContext } from "../../context/EquipmentContext";


export default function EquipmentSearch() {
  const { getCategories } = useCategories()
  const {getSearchEquipment}=useEquipment()
  const { getEquipments}=useEquipmentContext()
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "")
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [maxDistance, setMaxDistance] = useState<number>(1000);
  const [results, setResults] = useState<Equipment[]>([]);
 
   useEffect(()=>{
    async function fetchCategories(){
    try{
        const data=await getCategories()
        setCategories(data)
      console.log(data)
    } catch (err){
      console.log (err)
    }} fetchCategories()
  },[])

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category_id = Number(e.target.value);
    console.log(category_id)
    setSelectedCategories((prev) =>
      prev.includes(category_id) ? prev.filter((id) => id !== category_id) : [...prev, category_id]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(300);
  };

  useEffect(() => {
  const query = searchParams.get("q") ?? "";
  setSearch(query);
}, [searchParams]);

const fetchResults = async () => {
  try {
    const params:any= {};
    if (search) params.q = search;
    if (selectedCategories.length) params.categories = selectedCategories;
    if (maxPrice) params.maxPrice = maxPrice;
    console.log(search)
    const data = await getSearchEquipment(params);
    setResults(Array.isArray(data) ? data : []);
    setHasSearched(true);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchResults();
}, [search]);
  
useEffect(() => {
  fetchResults();
}, [selectedCategories]);

useEffect(() => {
  fetchResults();
}, [maxPrice]);

 useEffect(() => {
  setSearch(searchParams.get("q") ?? "")
}, [searchParams])


  
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                 const value = (e.target as HTMLInputElement).value;
                 navigate(`/rechercher?q=${encodeURIComponent(value)}`);
                 }
               }}
              className="w-full h-10 pr-4 pl-10 text-blackText bg-gray-100 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary placeholder:text-gray-600"
              placeholder="Rechercher du matériel..."
            />
          </div>
        </div>
        {hasSearched&& results.length === 0 && (
          <div className="text-center p-2 text-gray-500">Aucun matériel ne correspond à votre recherche</div>
        )}
        
          <div className="text-gray-600 text-sm">
            {results.length}
            {results.length > 1 ? " résultats trouvés" : " résultat trouvé"}
          </div>
        
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-80 md:block">
          <div className="border rounded-lg p-6 space-y-6 bg-white">
            <div>
              <h3 className="text-lg mb-4 text-gray-900">Catégories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label
                    key={cat.category_id}
                    className="flex items-center gap-1 text-sm font-semibold select-none cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={cat.category_id}
                      checked={selectedCategories.includes(cat.category_id)}
                      onChange={handleChangeCategory}
                    />
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-lg mt-6 text-gray-900">Prix par jour</h3>
               <Slider max={300} value={maxPrice} onChange={(value: number | string) => setMaxPrice(Number(value))} />

                
              </div>

              <div>
                <h3 className="text-lg mt-6 text-gray-900">Distance maximale</h3>
                <Slider max={1000} unit="km"  value={maxDistance} onChange={(value: number | string) => setMaxDistance(Number(value))} />
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-6 h-9 rounded-md border text-sm font-medium hover:bg-gray-100"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="loop-div">
            {results.map((equipment) => (
              <Link key={equipment.equipment_id} to={`/equipment/${equipment.equipment_id}`}>
                <ItemCard equipment={equipment} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
