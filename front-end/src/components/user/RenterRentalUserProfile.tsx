
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import getInitials from "../GetInitials";
import { useStatus } from "../../context/StatusContext";
import Loader from "../Loader";
import { useRentals } from "../../hook/useRentals";
import { Rental } from "../../types/Rental";
import StripePaiement from "../StripePaiement";
import Reviews from "../reviews/Reviews";
import { useReviews } from "../../hook/useReviews";
import FormatDate from "../FormatDate";

export default function RenterRentalsUserProfile(){
    const baseUrl=import.meta.env.VITE_BASE_URL
    const [renterRentals,setRenterRentals]=useState<Rental[]>([])
    const [showReview, setShowReview]=useState<{ [rental_id: number]: boolean }>({});
    const [hasReview, setHasReview] =  useState<{ [rental_id: number]: boolean }>({});
    const { getEquipmentIsReview, getUserIsReview}=useReviews()
    const {getRenterRentals}=useRentals()
    const {user_id}=useAuth()
    const {status}=useStatus()

    useEffect(() => {
       if (!user_id) return
       const id=user_id
        async function fetchRenterRental(){
            try{
                const data= await getRenterRentals(id)
                setRenterRentals(data||[])
            }catch(err){
                console.log(err)
            }
        } 
        fetchRenterRental()
       }, [user_id])
       
        useEffect(()=>{
      async function isReview(){
        for(const rental of renterRentals)
        try{
        const resUser= await getUserIsReview(rental.rental_id)
        const resEquipment= await getEquipmentIsReview(rental.rental_id)
        setHasReview(prev => ({
          ...prev,
          [rental.rental_id]: resUser.hasReview && resEquipment.hasReview
        }));
        } catch(err){
          console.log(err)
        }
      }isReview()
    },[ renterRentals])
    
    const handleClick=()=>{
        confirm("Êtes-vous sûr de vouloir annuler cette location ?")
    }
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
                    {renterRentals && renterRentals.map ((r)=>(
                        <div className="bg-white flex flex-col gap-6 rounded-xl border p-4">
                        <div className="flex  gap-6">
                            <Link to={`/equipment/${r.equipment?.equipment_id}`}>
                            <img src={r.equipment?.photo} alt={r.equipment?.title} className="w-32 h-32 object-cover rounded-lg"></img>
                            </Link>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                     <h3 className="text-xl text-gray-900 mb-3">{r.equipment?.title}</h3>
                                     <div className="flex items-center">
                                       {r.equipment?.owner?.photo && r.equipment?.owner?.photo !=="NULL" ? (  
                                                              <img src={r.equipment?.owner?.photo} alt={r.equipment?.owner?.first_name} className="w-12 h-12 object-cover rounded-full mr-4"/>
                                                       ):(
                                                          <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-accent rounded-full mr-4">{getInitials(r.equipment?.owner)}</span>
                                                       )
                                                          } 
                                        <div className="flex flex-col ">
                                            <p className="text-gray-600 "> {r.equipment?.owner?.first_name} {r.equipment?.owner?.last_name}</p> 
                                            <div  className="flex items-center">
                                            <IoLocationOutline /> <span className="text-gray-600">{r.equipment?.owner?.city} </span>  
                                            </div>
                                     </div>
                                     </div>
                                    </div>
                                     {r.status==="accepted" && (
                                    <div className="flex flex-col text-center items-center">
                                        <p className="text-gray-900 p-2">{r.equipment?.owner?.last_name}  a accepté votre demande de réservation. <br /> Pour la confirmer, payez dès maintenant : </p>
                                        <StripePaiement rental_id={Number(r.rental_id)}></StripePaiement> 
                                    </div>
                                   )}
                                   <div className="flex flex-col items-center gap-5">
                                    <span className={`inline-flex items-center justify-center rounded-md border px-2 py-1 font-medium w-fit ${status[r.status].className}`}>{status[r.status].label}</span>
                                    {r.status==="confirmed"&& (
                                    <div className="">
                                        <button onClick={handleClick} className="btn border-red-400 bg-red-200 ">Annuler la location</button>
                                    </div>
                                )}
                                    </div>
                                   
                                </div>
                                <hr className="my-1 border-gray-300"/>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {FormatDate(r.start_date)} au {FormatDate(r.end_date)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl text-primary">{r.total_price} €</p>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-sm text-gray-500">Caution : {r.equipment?.caution} €</p>
                                    </div>
                                </div>
                                    {r.status === "completed" && (
                                     <>
                                     
                                       {!showReview[r.rental_id] ? (
                                         hasReview[r.rental_id]? (
                                           <p className=" text-gray-500">Vous avez déjà laissé un avis.</p>
                                         ) : (
                                           <button onClick={()=> setShowReview(prev=>({...prev,[r.rental_id]:true}))} className="btn hover:bg-gray-300">
                                             Laisser un avis
                                           </button>
                                        )
                                       ) : (
                                        <Reviews rental={r}
                                                reviewSubmitted={() => {setShowReview(prev => ({...prev, [r.rental_id]: false}))
                                                 setHasReview(prev => ({...prev, [r.rental_id]: true}))
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