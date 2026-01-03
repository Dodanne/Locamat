import ItemCard from "./ItemCard.js";
import type {Item} from "../../types/item.js"
import { User } from "../../types/users.js";
import { Link } from "react-router-dom";

type PopularItemsProps={
  items:Item[]
  users:User[]
  
}


export default function PopularItems({items,users}:PopularItemsProps) {
  console.log("items in PopularItems:", items);
  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl text-gray-900 text-center">Matériel populaire</h2>
        <Link to="/rechercher"> <button className="inline-flex items-center justify-center gap-2h-9 px-4 py-2 rounded-md border text-sm font-medium bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition">Voir tout</button></Link>
      </div>
      <div className="loop-div">
        {items.map((i) => {
            const user = users.find((u) => u.id === i.owner_id);
            if (!user) return null; 
            return <Link to={`/equipment/${i.id}`}><ItemCard key={i.id} item={i} user={user} /></Link>
          })}
         </div>
      </div>
    </div>
   ); 
}
 