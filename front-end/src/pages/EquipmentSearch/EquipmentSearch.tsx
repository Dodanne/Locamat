import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEquipment } from "../../context/EquipmentContext";
import { useCategory } from "../../context/CategoryContext";
import ItemCard from "../../components/ItemCard";
import Slider from "../../components/Slider";
import { Equipment } from "../../types/Equipment";
import { useNavigate } from "react-router-dom";


export default function EquipmentSearch() {
  const { categories } = useCategory();
  const {equipmentList,fetchEquipments}=useEquipment()
  const [searchParams] = useSearchParams();
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [maxDistance, setMaxDistance] = useState<number>(1000);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
 
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(300);
  };
const filteredItems = equipmentList.filter((item) => {
  const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
  const matchesCategory =
    selectedCategories.length === 0 || selectedCategories.includes(item.category_id);
  const matchesPrice = Number(item.price) <= Number(maxPrice);
  console.log(matchesPrice)
  console.log(item.price)
  return matchesSearch && matchesCategory && matchesPrice;
  
});
console.log(maxPrice, filteredItems.map(i => i.price))

useEffect(() => {
  fetchEquipments(); 
  setHasSearched(true);

}, []);
   
  useEffect(() => {
    const categoryId = searchParams.get("categorie");
    if (categoryId) {
      setSelectedCategories([Number(categoryId)]);
    }
  }, [searchParams]);
console.log(filteredItems)
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
        {hasSearched&& filteredItems.length === 0 && (
          <div className="text-center p-2 text-gray-500">Aucun matériel ne correspond à votre recherche</div>
        )}
        
          <div className="text-gray-600 text-sm">
            {filteredItems.length}
            {filteredItems.length > 1 ? " résultats trouvés" : " résultat trouvé"}
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
            {filteredItems.map((equipment) => (
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
