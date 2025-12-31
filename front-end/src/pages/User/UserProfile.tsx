import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { PiClockCounterClockwise } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import ItemCard from "../Home/ItemCard";
import type {Item} from "../../types/item"
import { User } from "../../types/users";
import AddEquipmentBtn from "../../components/AddEquipmentBtn";
import StarRating from "../../components/StarRating";

type ItemCardProps = {
    items:Item []
    users:User[]
}

export default function UserProfile ({items, users}:ItemCardProps){
const [activeDiv,setActiveDiv]=useState("")


    return(
    <div className="container py-8">
        <div className=" flex flex-col gap-6 rounded-xl border bg-white">
            <div className="flex items-start gap-6 p-4">
                <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full h-24 w-24">
                <img src={users[0]?.photo} alt={users[0]?.first_name} className="img-cover"/></span>
                <div className="flex-1">
                    <div className="flex items-center gap-3 my-2">
                        <h1 className="text-3xl text-gray-900">{users[0]?.first_name} {users[0]?.last_name}</h1>
                        <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit gap-1 overflow-hidden border-transparent bg-gray-300">Particulier</span>
                    </div>
                    <div className="flex items-center gap-6 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                            <FaStar  className="text-yellow-400"/>
                            <span className="text-gray-900">{users[0]?.rating_avg}</span>
                            <span className="text-gray-500">{users[0]?.rating_count}</span>
                        </div>  
                        <div className="flex items-center gap-1">
                            <IoLocationOutline />
                            <span>{users[0]?.city} </span>  
                        </div>            
                    </div>
                    <div className="flex gap-3">
                        <button className="btn border-gray-200 bg-background hover:bg-gray-200 h-9 px-4 py-2">
                        <FaRegEdit /> Modifier le profil
                        </button>
                        <button className="btn border-gray-200 bg-background hover:bg-gray-200 h-9 px-4 py-2">
                        <IoSettingsOutline /> Paramètres
                        </button>
                    </div>
                </div>   
            </div>
        </div>
        <div className="flex flex-col gap-2 my-6">
            <div className="bg-gray-200 h-9 items-center justify-center rounded-xl p-[3px] grid w-full grid-cols-3">
                <button onClick={()=>setActiveDiv("equipment")} className="btn bg-white py-1 px-2 rounded-xl h-7">
                    <BsBoxSeam /> Mon matériel () 
                </button>
                
                <button onClick={()=>setActiveDiv("locations")} className="btn bg-white py-1 px-2 rounded-xl h-7">
                    <PiClockCounterClockwise /> Mes locations () 
                </button>
                 <button onClick={()=>setActiveDiv("reviews")} className="btn bg-white py-1 px-2 rounded-xl h-7">
                    <FaRegStar /> Avis reçus() 
                </button>
            </div> 
       
        {activeDiv==="equipment"&&(
                <>
                     <div className="flex items-center justify-between"> 
                       <h2 className="text-2xl text-gray-900 my-4">Mon matériel</h2>
                       <AddEquipmentBtn/>
                     </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {items&& items.map ((i)=>{
                          const user = users.find((u) => u.id === i.owner_id);
                                     if (!user) return null; 
                                     return <ItemCard key={i.id} item={i} user={user} />;
                                   })}
                        
                    </div>
                </>   
                )}
            {activeDiv==="locations"&&(
                <>
                <div className="flex items-center justify-between"> 
                       <h2 className="text-2xl text-gray-900 my-4">Historique des locations</h2>
                 </div>
                <div className="space-y-4">
                    {items&& items.map ((i)=>(

                    <div className="bg-white flex flex-col gap-6 rounded-xl border p-4">
                        <div className="flex gap-6">
                            <img src={i.photo} alt={i.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                     <h3 className="text-xl text-gray-900 mb-1">{i.title}</h3>
                                     <p className="text-gray-600"> Propriétaire : user.name</p>
                                    </div>
                                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit">passée</span>
                                </div>
                                <hr className="my-4"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du : useritem.startdate</p>
                                        <p>Du : useritem.enddate</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl text-primary">{i.price} €</p>
                                        <p className="text-sm text-gray-500">Total</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button className="btn hover:bg-gray-300">Laisser un avis </button>
                                    <button className="btn hover:bg-gray-300">Voir les détails </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </>

            )}
            {activeDiv==="reviews"&&(
                <>
                <div className="space-y-6">
                    <h2 className="text-2xl text-gray-900">Avis reçus</h2>
                    <div  className=" bg-white flex flex-col gap-6 rounded-xl border p-4">
                        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                            <h4  className="text-xl text-gray-900 mb-1">Statistiques</h4>
                        </div>
                        <div className="px-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">{users[0]?.rating_avg}</div>
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <StarRating rating={users[0]?.rating_avg??0} />
                                    </div>
                                        <p className="text-gray-600">Note moyenne</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">
                                        {users[0]?.rating_count}
                                    </div>
                                <p className="text-gray-600">Avis reçus</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">
                                        {Math.round((users[0]?.rating_avg || 0) * 20)}%
                                    </div>
                                <p className="text-gray-600">Taux de satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-12 text-gray-500">
                        <p>Vos avis s'afficheront ici</p>
                    </div>
                </div>
                </>
            )}
            </div>
    </div>

    )
}