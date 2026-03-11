import ItemCard from "../../components/equipment/ItemCard";
import { Link } from "react-router-dom";
import { useEquipment } from "../../hook/useEquipments";
import { useEffect, useState } from "react";
import { Equipment } from "../../types/Equipment";

export default function PopularItems() {
  const { getEquipment6First } = useEquipment();
  const [equipment6First, setEquipment6First] = useState<Equipment[]>([])

     useEffect(()=>{
      async function fetchPopularEquipment(){
        try{
        const data = await getEquipment6First()
        setEquipment6First(data || [])
        } catch (err){
          console.log(err)
        }
      } fetchPopularEquipment()
      },[])

  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-xl font-semibold md:font-normal md:text-3xl text-gray-900 text-center">Dernier matériel ajouté</h2>
          <Link to="/rechercher">
            <button className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 rounded-md border text-sm font-medium bg-background  hover:bg-accent hover:text-accent-foreground transition">
              Voir tout
            </button>
          </Link>
        </div>
        <div className="loop-div">
          {equipment6First.map((equipment) => (
            <Link key={equipment.equipment_id} to={`/equipment/${equipment.equipment_id}`}>
              <ItemCard equipment={equipment} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
 