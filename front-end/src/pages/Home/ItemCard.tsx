import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import type {Equipment} from "../../types/Equipment"


type ItemCardProps = {
    equipment:Equipment
}


export default function ItemCard({equipment}:ItemCardProps) {
return (
    <div className="flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition h-full bg-white">
         {/* Image */}
        <div className="relative h-48">
            <img src={`http://localhost:3033/images/equipments/${equipment.photo}`} alt={equipment.title} className="img-cover"/>
             <span className="absolute top-3 right-3 bg-white text-primary text-xs font-medium px-2 py-0.5 rounded-md border">
                {equipment.owner?.user_type}</span>
        </div>
    {/* Contenu */}
        <div className="p-4 flex flex-col gap-4">
            {/* Titre + Localisation */}
            <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg text-gray-900 mb-1">{equipment.title}</h3>
                <span className="text-sm text-black bg-primary/10 px-1 py-1 rounded-full text-center">{equipment.category?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <IoLocationSharp />
      <span>{equipment.owner?.city}</span>  
    </div>

        {/* Note + Prix */}
<div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
            <FaStar  className="text-yellow-400"/>
            <span className="text-gray-900">{equipment.owner?.rating_avg} </span>
            <span className="text-gray-500">{equipment.owner?.rating_count}</span>
        </div>
        <div className="text-right">
            <div className="text-2xl text-primary">{equipment.price}€</div>
             <div className="text-sm text-gray-500">par jour</div>
             </div>
         </div>
     </div>
</div>
)
}