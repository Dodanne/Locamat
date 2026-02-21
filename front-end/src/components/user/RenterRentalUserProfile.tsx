
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import getInitials from "../GetInitials";
import { useStatus } from "../../context/StatusContext";
import Loader from "../Loader";
import { useRentals } from "../../hook/useRentals";

export default function RenterRentalsUserProfile(){
    const baseUrl=import.meta.env.VITE_BASE_URL
    const {renterRentals,getRenterRentals}=useRentals()
    const {user_id}=useAuth()
    const {status}=useStatus()

    useEffect(() => {
       if (user_id){
         getRenterRentals(user_id)
       }
       }, [user_id])
       
       if (!renterRentals) return <Loader/>
    return (
 <>
                {renterRentals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <p className="text-lg mb-4">  Vous n’avez pas encore commencé à louer. </p>
                        <p className="mb-6"> Commencez dès à présent à louer du materiel près de chez vous. </p>
                            <Link to="/rechercher"> <div className="btn p-3 bg-accent text-white"> Trouver du materiel à emprunter </div> </Link>
                    </div>
                     ) :(
                        <>
                    <div className="flex equipments-center justify-between"> 
                       <h2 className="text-2xl text-gray-900 my-4"> Matériel que j’ai loué</h2>
                    </div>
                    <div className="space-y-4">
                    {renterRentals && renterRentals.map ((e)=>(
                        <div className="bg-white flex flex-col gap-6 rounded-xl border p-4">
                        <div className="flex items-center gap-6">
                            <Link to={`/equipment/${e.equipment?.equipment_id}`}>
                            <img src={`${baseUrl}/images/equipments/${e.equipment?.photo}`} alt={e.equipment?.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            </Link>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                     <h3 className="text-xl text-gray-900 mb-3">{e.equipment?.title}</h3>
                                     <div className="flex items-center">
                                       {e.equipment?.owner?.photo && e.equipment?.owner?.photo !=="NULL" ? (  
                                                              <img src={`${baseUrl}/images/users/${e.equipment?.owner?.photo}`} alt={e.equipment?.owner?.first_name} className="w-12 h-12 object-cover rounded-full mr-4"/>
                                                       ):(
                                                          <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-accent rounded-full mr-4">{getInitials(e.equipment?.owner)}</span>
                                                       )
                                                          } 
                                        <div className="flex flex-col ">
                                            <p className="text-gray-600 "> {e.equipment?.owner?.first_name} {e.equipment?.owner?.last_name}</p> 
                                            <div  className="flex items-center">
                                            <IoLocationOutline /> <span className="text-gray-600">{e.equipment?.owner?.city} </span>  
                                            </div>
                                     </div>
                                     </div>
                                    </div>
                                   <span className={`inline-flex items-center justify-center rounded-md border px-2 py-1 font-medium w-fit ${status[e.status].className}`}>{status[e.status].label}</span>
                                   
                                </div>
                                <hr className="my-1 border-gray-300"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {e.start_date} au {e.end_date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl text-primary">{e.total_price} €</p>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-sm text-gray-500">Caution : {e.equipment?.caution} €</p>
                                    </div>
                                </div>
                                <div >
                                    <button className="btn hover:bg-gray-300">Laisser un avis </button>
                                </div>
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