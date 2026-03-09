import AddEquipmentBtn from "../AddEquipmentBtn"
import { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStatus } from "../../context/StatusContext";
import { Link } from "react-router-dom";
import { useRentals } from "../../hook/useRentals";
import Loader from "../Loader";
import { Rental, RentalStatus } from "../../types/Rental";
import getInitials from "../GetInitials";
import { IoLocationOutline } from "react-icons/io5";
import Reviews from "../reviews/Reviews";
import { useReviews } from "../../hook/useReviews";
import FormatDate from "../FormatDate";

export default function OwnerRentalsUserProfile(){
    const {status}=useStatus()
    const {getOwnerRentals, patchStatusRental}=useRentals()
     const [showReview, setShowReview]=useState<{ [rental_id: number]: boolean }>({});
    const [hasReview, setHasReview] =  useState<{ [rental_id: number]: boolean }>({});
    const [ownerRentals,setOwnerRentals]=useState<Rental[]>([])
    const { getUserIsReview}=useReviews()
    const {user_id} =useAuth()
    
        useEffect(() => {
       if (!user_id) return
       const id=user_id
        async function fetchRenterRental(){
            try{
                const data= await getOwnerRentals(id)
                setOwnerRentals(data||[])
            }catch(err){
                console.log(err)
            }
        } 
        fetchRenterRental()
       }, [user_id])

    function handleChangeStatus(id:number, newStatus:RentalStatus){
        patchStatusRental(id, newStatus)
          setOwnerRentals(prev =>prev.map(r =>r.rental_id === id ? { ...r, status: newStatus } : r))
    }
     useEffect(()=>{
      async function isReview(){
        for(const rental of ownerRentals)
        try{
        const resUser= await getUserIsReview(rental.rental_id)
     
        setHasReview(prev => ({
          ...prev,
          [rental.rental_id]: resUser.hasReview 
        }));
        
        } catch(err){
          console.log(err)
          
        }
      }isReview()
    },[ ownerRentals])

    
    const handleClick=()=>{
        confirm("Êtes-vous sûr de vouloir annuler cette location ?")
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
                            <Link to={`/equipment/${e.equipment?.equipment_id}`}> 
                                <img src={e.equipment?.photo} alt={e.equipment?.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            </Link>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                         <h3 className="text-xl text-gray-900 mb-1">{e.equipment?.title}</h3>
                                       
                                    </div>
                                    <span className={`inline-flex items-center justify-center rounded-md border px-2 py-1 font-medium w-fit ${status[e.status].className}`}>{status[e.status].label}</span>
                                    {e.status==="confirmed"&& (
                                    <div className="">
                                        <button onClick={handleClick} className="btn border-red-400 bg-red-200 ">Annuler la location</button>
                                    </div>
                                )}
                                </div>
                                
                                <hr className="my-4"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {FormatDate(e.start_date)}</p>
                                        <p>Au {FormatDate(e.end_date)}</p>
                                    </div>
                                     <div className="flex items-center">
                                    
                                         {e.renter?.photo && e.renter?.photo !=="NULL" ? (  
                                                 <img src={e.renter?.photo} alt={e.renter?.first_name} className="w-12 h-12 object-cover rounded-full mr-4"/>
                                                         ):(
                                                            <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-accent rounded-full mr-4">{getInitials(e.renter)}</span>
                                                         )
                                                           } 
                                                           <div className="flex flex-col ">
                                                                <p className="text-gray-600 "> {e.renter?.first_name} {e.renter?.last_name}</p> 
                                                                <div  className="flex items-center">
                                                                    <IoLocationOutline /> <span className="text-gray-600">{e.renter?.city} </span>  
                                                                </div>
                                        </div>
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
                                        <p className="text-2xl text-primary">{e.total_price} €</p>
                                        <p className="text-sm text-gray-500">Total</p>
                                    </div>
                                </div>
                                
                                {e.status === "completed" && (
                                 <>
                                 {console.log("showReview:", !showReview[e.rental_id])}
                                     {console.log("hasReview:", hasReview[e.rental_id])}
                                   {!showReview[e.rental_id] ? (
                                     hasReview[e.rental_id]? (
                                       <p className=" text-gray-500">Vous avez déjà laissé un avis.</p>
                                     ) : (
                                       <button
                                         onClick={()=> setShowReview(prev=>({...prev,[e.rental_id]:true}))}
                                         className="btn hover:bg-gray-300"
                                       >
                                         Laisser un avis
                                       </button>
                                    )
                                   ) : (
                                     <Reviews rental={e}
                                      reviewSubmitted={() => {
                                         setShowReview(prev => ({...prev, [e.rental_id]: false}))
                                         setHasReview(prev => ({...prev, [e.rental_id]: true}))
                                        }}/>
                                   )}
                                 </>
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