import {Link} from "react-router-dom"
import { TiPlus } from "react-icons/ti";

export default function AddEquipmentBtn(){


    return (
        <Link to="/new-equipment" className="flex items-center justify-center gap-2 rounded-md px-4 h-9 text-sm font-medium bg-accent text-white hover:bg-[#0087BB]">
        <TiPlus/>Ajouter du matériel</Link>
    )
}