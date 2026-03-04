import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { PiClockCounterClockwise } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import { FaHandHolding } from "react-icons/fa";
import getInitials from "../../components/GetInitials";
import EquipmentUserProfile from "../../components/user/EquipmentUserProfile";
import OwnerRentalsUserProfile from "../../components/user/RenterRentalUserProfile";
import RenterREntalsUserProfile from "../../components/user/OwnerRentalUserProfile";
import ReviewsUserProfile from "../../components/user/ReviewsUserProfile";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hook/useUsers";
import { User } from "../../types/User";
import Loader from "../../components/Loader";


export default function UserProfile (){
    const baseUrl=import.meta.env.VITE_BASE_URL
    const location = useLocation()
    const state = location.state?.activeDiv;
    const [activeDiv,setActiveDiv]=useState(state||"equipment")
    const {user_id}=useAuth()
    const {getUserById}=useUsers()
    const [user, setUser] = useState<User|null>(null);

     useEffect(() => {
        if(!user_id) return
        const id= user_id
        async function fetchUserById(){
        try{
        const data= await getUserById(id)
         setUser(data)
        }catch(err){
            console.log(err)
        }
    }fetchUserById()
    }, [user_id])

    if(!user) return <Loader/>
 
    return(
    <div className="container py-8">
        <div className=" grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 rounded-xl border bg-white">
            <div className="flex items-start gap-6 p-4">
                <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full h-24 w-24">
                    {user.photo && user.photo !=="NULL" ? (  
                        <img src={user.photo} alt={user.first_name} className="w-full h-full object-cover"/>
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
                        {/* <button className="btn border-gray-200 bg-background hover:bg-gray-200 h-9 px-4 py-2">
                        <IoSettingsOutline /> Paramètres
                        </button> */}
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
                <button onClick={()=>setActiveDiv("equipment")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="equipment" ? 'bg-gray-300' : ''} `}>
                    <BsBoxSeam /> Mon matériel  </button>
                
                <button onClick={()=>setActiveDiv("locations")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="locations" ? 'bg-gray-300' : ''} `}>
                    <PiClockCounterClockwise /> Mes réservations 
                </button>
                <button onClick={()=>setActiveDiv("prêts")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="prêts" ? 'bg-gray-300' : ''} `}>
                    <FaHandHolding className="flex items-center gap-2 relative -top-0.5"/> Mes mises en location
                </button>
                 <button onClick={()=>setActiveDiv("reviews")} className={`btn py-1 px-2 rounded-xl h-7 ${activeDiv==="reviews" ? 'bg-gray-300' : ''} `}>
                    <FaRegStar /> Avis reçus
                </button>
            </div> 
       
             {activeDiv==="equipment"&&(
                <EquipmentUserProfile/>
             )}
            {activeDiv==="locations"&&(
               <OwnerRentalsUserProfile/>     
            )}
             {activeDiv==="prêts"&&(
                <RenterREntalsUserProfile/>
            )}
            {activeDiv==="reviews"&&(
                <ReviewsUserProfile/>
            )}
            </div>
    </div>

    )
}