import ItemCard from "./ItemCard.js";
import type {Equipment} from "../../types/Equipment.js"
import { User } from "../../types/User.js";
import { Link } from "react-router-dom";

type PopularItemsProps={
  equipments:Equipment[]
  users:User[]
  
}


export default function PopularItems({equipments,users}:PopularItemsProps) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl text-gray-900 text-center">Dernier matériel ajouté</h2>
        <Link to="/rechercher"> <button className="inline-flex items-center justify-center gap-2h-9 px-4 py-2 rounded-md border text-sm font-medium bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition">Voir tout</button></Link>
      </div>
      <div className="loop-div">
        {equipments.map((i) => {
      console.log(equipments)
            const user = users.find((u) => u.user_id === i.owner_id);
            console.log(i)
            if (!user) return null; 
            return <Link to={`/equipment/${i.equipment_id}`}><ItemCard key={i.equipment_id} equipment={i} user={user} /></Link>
          })}
         </div>
      </div>
    </div>
   ); 
}
 