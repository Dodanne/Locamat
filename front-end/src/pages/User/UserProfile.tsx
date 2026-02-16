import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { PiClockCounterClockwise } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard";
import AddEquipmentBtn from "../../components/AddEquipmentBtn";
import StarRating from "../../components/StarRating";
import { User } from "../../types/User";
import { Equipment } from "../../types/Equipment";
import { FaHandHolding } from "react-icons/fa";
import { Rental } from "../../types/Rental";
import { useAuth } from "../../context/AuthContext";
import EquipmentItem from "../EquipmentItem/EquipmentItem";
import apiAuth from "../../api/axiosAuth";
import getInitials from "../../components/GetInitials";


export default function UserProfile (){
    const baseUrl=import.meta.env.VITE_BASE_URL
    const [activeDiv,setActiveDiv]=useState("equipment")
    const [user,setUser]=useState<User>({}as User)
    const [userEquipments,setUserEquipments]=useState<Equipment[]>([])
    const [renterRentals,setRenterRentals]=useState<Rental[]>([])
    const [ownerRentals,setOwnerRentals]=useState<Rental[]>([])
    const {user_id}=useAuth()

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await apiAuth.get(`/user/${user_id}`);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, [user_id]);
    useEffect(() => {
        async function fetchUserEquipments() {
            try {
                const res = await apiAuth.get(`/user/${user_id}/equipment`);
                setUserEquipments(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserEquipments();
    }, [user_id]);

    useEffect(() => {
        async function fetchRenterRentals() {
            try {
                const res = await apiAuth.get(`/rental/renter/${user_id}`);
                setRenterRentals(Array.isArray(res.data) ? res.data : []); // pour ne pas avoir null=>tableau vide
            } catch (err) {
                console.error(err);
            }
        }
        fetchRenterRentals();
    }, [user_id]);
    
    useEffect(() => {
        async function fetchOwnerRentals() {
            try {
                const res = await apiAuth.get(`/rental/owner/${user_id}`);
                setOwnerRentals(Array.isArray(res.data) ? res.data : []); // pour ne pas avoir null=>tableau vide
            } catch (err) {
                console.error(err);
            }
        }
        fetchOwnerRentals();
    }, [user_id]);
    

 const handleDeleteEquipment = async (id: number) => {
  if (!confirm("Supprimer cet équipement ?")) return;

  await apiAuth.delete(`${baseUrl}/equipment/${id}`)
  setUserEquipments((prev) =>
    prev.filter((e) => e.equipment_id !== id)
  );
};   

const handleUpdateEquipment = async (id: number, data: Equipment) => {
  try {
    await apiAuth.put(`/equipment/${id}`)
    setUserEquipments((prev) =>
      prev.map((e) =>
        e.equipment_id === id ? { ...e, ...data } : e
      )
    );
  } catch (error) {
    console.log(error);
    alert("Impossible de mettre à jour l’équipement");
  }
};


   

    return(
    <div className="container py-8">
        <div className=" grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 rounded-xl border bg-white">
            <div className="flex items-start gap-6 p-4">
                <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full h-24 w-24">
                    {user.photo && user.photo !=="NULL" ? (  
                        <img src={`${baseUrl}/images/users/${user.photo}`} alt={user.first_name} className="w-full h-full object-cover"/>
                 ):(
                    <span className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-accent rounded-full">{getInitials(user)}</span>
                 )
                    } 
                </span>
                <div className="flex-1">
                    <div className="flex items-center gap-3 my-2">
                        <h1 className="text-3xl text-gray-900">{user.first_name} {user.last_name}</h1>
                        <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit gap-1 overflow-hidden border-transparent bg-gray-300">{user.user_type}</span>
                    </div>
                    <div className="flex items-center gap-6 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                            <FaStar  className="text-yellow-400"/>
                            <span className="text-gray-900">{user.rating_avg}</span>
                            <span className="text-gray-500">{user.rating_count}</span>
                        </div>  
                        <div className="flex items-center gap-1">
                            <IoLocationOutline />
                            <span>{user.city} </span>  
                        </div>            
                    </div>
                    <div className="flex gap-3">
                        <button className="btn border-gray-200 bg-background hover:bg-gray-200 h-9 px-4 py-2">
                        <FaRegEdit /> Modifier les informations du profil
                        </button>
                        <button className="btn border-gray-200 bg-background hover:bg-gray-200 h-9 px-4 py-2">
                        <IoSettingsOutline /> Paramètres
                        </button>
                    </div>
                </div>   
            </div>
            {(user.role === "SUPER-ADMIN"
            || user.role==="ADMIN")
             && 
            (
                <div className="fixed bottom-4 left-4 right-4 z-50 lg:static lg:z-auto lg:flex lg:flex-col justify-center lg:bg-white lg:p-4 m-4">
                   {/* mobile */}
                   <button className="btn bg-accent text-white w-full shadow-lg lg:hidden"> Accès admin </button>
                  {/* ordi */}
                  <div className="hidden lg:flex flex-col gap-4">    
                    <Link to="/admin-dashboard"><button className="btn bg-accent text-white w-full p-2">Accès admin</button></Link>
                     </div>
                  </div>
                )}

        </div>
        <div className="flex flex-col gap-2 my-6">
            <div className="bg-gray-200 h-9 items-center justify-center rounded-xl p-[3px] grid w-full grid-cols-4">
                <button onClick={()=>setActiveDiv("equipment")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="equipment" ? 'bg-white' : ''} `}>
                    <BsBoxSeam /> Mon matériel  </button>
                
                <button onClick={()=>setActiveDiv("locations")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="locations" ? 'bg-white' : ''} `}>
                    <PiClockCounterClockwise /> Mes locations  
                </button>
                <button onClick={()=>setActiveDiv("prêts")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="prêts" ? 'bg-white' : ''} `}>
                    <FaHandHolding className="flex items-center gap-2 relative -top-0.5"/> Mes prêts 
                </button>
                 <button onClick={()=>setActiveDiv("reviews")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="reviews" ? 'bg-white' : ''} `}>
                    <FaRegStar /> Avis reçus
                </button>
            </div> 
       
        {activeDiv==="equipment"&&(
                <>
                {userEquipments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <p className="text-lg mb-4">  Vous n’avez pas encore commencé à louer. </p>
                        <p className="mb-6"> Commencez dès à présent en ajoutant votre premier matériel </p>
                    <AddEquipmentBtn />
                    </div>
                     ) :(
                        <> 
                     <div className="flex items-center justify-between"> 
                       <h2 className="text-2xl text-gray-900 my-4">Mon matériel</h2>
                       <AddEquipmentBtn/>
                     </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                       {userEquipments.map ((e)=> (
                            <ItemCard key={e.equipment_id} equipment={e}  editable onUpdate={handleUpdateEquipment} onDelete={handleDeleteEquipment} /> 
                       ))}      
                    </div>
                    </>
                     )}
                </>   
                )}
            {activeDiv==="locations"&&(
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
                        <div className="flex gap-6">
                            <img src={`${baseUrl}/images/equipments/${e.equipment?.photo}`} alt={e.equipment?.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                     <h3 className="text-xl text-gray-900 mb-1">{e.equipment?.title}</h3>
                                     <p className="text-gray-600"> {e.renter?.first_name} {e.renter?.last_name}</p>
                                    </div>
                                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit">passée/encours/bientot</span>
                                </div>
                                <hr className="my-4"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {e.start_date}</p>
                                        <p>Du {e.end_date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl text-primary">{e.equipment?.price} €</p>
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
            </>
            )}
             {activeDiv==="prêts"&&(
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
                            <img src={`${baseUrl}/images/equipments/${e.equipment?.photo}`} alt={e.equipment?.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                     <h3 className="text-xl text-gray-900 mb-1">{e.equipment?.title}</h3>
                                     <p className="text-gray-600"> {e.equipment?.owner?.first_name} {e.equipment?.owner?.last_name}</p>
                                    </div>
                                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit">passe/encours/bientot</span>
                                </div>
                                <hr className="my-4"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {e.start_date}</p>
                                        <p>Du {e.end_date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl text-primary">{e.equipment?.price} €</p>
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
                                    <div className="text-4xl text-primary mb-2">{user?.rating_avg}</div>
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <StarRating rating={user.rating_avg??0} />
                                    </div>
                                        <p className="text-gray-600">Note moyenne</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">
                                        {user.rating_count}
                                    </div>
                                <p className="text-gray-600">Avis reçus</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">
                                        {Math.round((user.rating_avg || 0) * 20)}%
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