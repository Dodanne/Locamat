import AddEquipmentBtn from "../AddEquipmentBtn"
import { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStatus } from "../../context/StatusContext";
import { Link } from "react-router-dom";
import { useRentals } from "../../hook/useRentals";
import Loader from "../Loader";
import { RentalStatus } from "../../types/Rental";

export default function OwnerRentalsUserProfile(){
    const {status}=useStatus()
    const {ownerRentals,getOwnerRentals, patchStatusRental}=useRentals()
    const baseUrl=import.meta.env.VITE_BASE_URL
    const {user_id} =useAuth()
    
      useEffect(() => {
       if (user_id){
        getOwnerRentals(user_id)
       }
    }, [user_id]);

    function handleChangeStatus(id:number, newStatus:RentalStatus){
        patchStatusRental(id, newStatus)
    }

    if (!ownerRentals) return <Loader/>
    return (
       <>
                 {ownerRentals.length===0 ? (
                    <>
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <p className="text-lg mb-4">  Vous n’avez pas encore commencé à louer. </p>
                        <p className="mb-6"> Commencez dès à présent en ajoutant votre premier matériel </p>
                    <AddEquipmentBtn />
                    </div>
                    </>
                     ) : (
                        <>
                <div className="flex equipments-center justify-between"> 
                       <h2 className="text-2xl text-gray-900 my-4"> Matériel que j’ai prêté</h2>
                 </div>
                <div className="space-y-4">
                    {ownerRentals && ownerRentals.map ((e)=>(
                    <div className="bg-white flex flex-col gap-6 rounded-xl border p-4">
                        <div className="flex gap-6">
                            <Link to="/rechercher"> 
                                <img src={`${baseUrl}/images/equipments/${e.equipment?.photo}`} alt={e.equipment?.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            </Link>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                         <h3 className="text-xl text-gray-900 mb-1">{e.equipment?.title}</h3>
                                         <p className="text-gray-600"> {e.equipment?.owner?.first_name} {e.equipment?.owner?.last_name}</p>
                                    </div>
                                    <span className={`inline-flex items-center justify-center rounded-md border px-2 py-1 font-medium w-fit ${status[e.status].className}`}>{status[e.status].label}</span>
                                </div>
                                <hr className="my-4"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {e.start_date}</p>
                                        <p>Au {e.end_date}</p>
                                    </div>
                                    {e.status==="pending"&& (
                                    <div>
                                       <p className="pt-4">Veuillez confirmer ou refuser la demande: </p> 
                                       <div className="p-6 flex gap-5">
                                            <button className="px-4 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600  transition shadow-md cursor-pointer " onClick={()=>handleChangeStatus(e.rental_id, "accepted")}> ✓ Confirmer </button>
                                            <button className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700  transition shadow-md cursor-pointer " onClick={()=>handleChangeStatus(e.rental_id, "refused")}> ✕ Refuser  </button>
                                       </div>
                                    </div>
                                      )
                                    }
                                    <div className="text-right">
                                        <p className="text-2xl text-primary">{e.equipment?.price} €</p>
                                        <p className="text-sm text-gray-500">Total</p>
                                    </div>
                                </div>
                                {e.status==="completed" && (
                                <div className="flex gap-2 mt-4">
                                    <button className="btn hover:bg-gray-300">Laisser un avis</button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    ))}
                </div>
                </>
                )}
            </>
    )
}