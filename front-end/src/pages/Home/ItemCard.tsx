import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import type {Item} from "../../types/item"
import { User } from "../../types/users";

type ItemCardProps = {
    item:Item
    user:User
}


export default function ItemCard({item, user}:ItemCardProps) {
return (
    <div className="flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
         {/* Image */}
        <div className="relative h-48">
            <img src={item.photo} alt={item.title} className="img-cover"/>
             <span className="absolute top-3 right-3 bg-white text-primary text-xs font-medium px-2 py-0.5 rounded-md border">
                {user.user_type}</span>
        </div>
    {/* Contenu */}
        <div className="p-4 flex flex-col gap-4 bg-white">
            {/* Titre + Localisation */}
            <h3 className="text-lg text-gray-900 mb-1">{item.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <IoLocationSharp />
      <span>{user.city}</span>  
    </div>

        {/* Note + Prix */}
<div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
            <FaStar  className="text-yellow-400"/>
            <span className="text-gray-900">{user.rating_avg} </span>
            <span className="text-gray-500">{user.rating_count}</span>
        </div>
        <div className="text-right">
            <div className="text-2xl text-primary">{item.price}€</div>
             <div className="text-sm text-gray-500">par jour</div>
             </div>
         </div>
     </div>
</div>
)
}