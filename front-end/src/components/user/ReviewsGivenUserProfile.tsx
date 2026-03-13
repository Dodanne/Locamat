import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useReviews } from "../../hook/useReviews"
import { ReviewUser } from "../../types/Review_user"
import Loader from "../Loader"
import getInitials from "../GetInitials"
import FormatDate from "../FormatDate"
import { IoLocationOutline } from "react-icons/io5";
import StarRating from "../StarRating"
import { Link } from "react-router-dom"

export default function ReviewsGivenUserProfile(){
     const {user_id}=useAuth()
     const {getUserGivenReviews}=useReviews()
     const [userReviews, setUserReviews] = useState<ReviewUser[]>([])

 useEffect(() => {
        if(!user_id) return
        async function fetchUserGivenReviews(){
    try{
        const data= await getUserGivenReviews(Number(user_id))
        console.log(data)
         setUserReviews(data)
         
     }catch(err){
            console.log(err)
        }
    }fetchUserGivenReviews()
    }, [user_id])
    
    if(!user_id) return <Loader/> 

    return (
        <>
                    {userReviews.length > 0 ? (
                        
                         <div className="flex flex-col gap-4">
                           {userReviews.map((r) => (
                            <div key={r.reviews_user_id} className="bg-white rounded-xl border p-4 space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    {r.reviewer?.photo && r.reviewer?.photo !== "NULL" ? (
                                      <img src={r.reviewer?.photo} className="w-10 h-10 object-cover rounded-full shrink-0"/>
                                    ) : (
                                      <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-accent rounded-full shrink-0">
                                        {getInitials(r.reviewer)}
                                      </span>
                                    )}
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        {r.reviewer ? `${r.reviewer.first_name} ${r.reviewer.last_name}` : "Utilisateur supprimé"}
                                      </p>
                                      <p className="text-gray-500 text-sm">{FormatDate(r.createdAt)}</p>
                                      <div className="flex items-center text-gray-500 text-sm">
                                        <IoLocationOutline/><span>{r.reviewer?.city}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <StarRating rating={r.rating}/>
                                    <span className="text-sm text-gray-600">({r.rating}/5)</span>
                                  </div>
                                </div>

                                   <div className="flex justify-center">
                                   <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-accent text-center md:w-2/3">
                                 <p className="text-gray-900 italic text-lg">"{r.comment}"</p>
                                 <span className="text-sm text-gray-500 mt-2 block">
                                   {r.status === "renter" ? "En tant que locataire" : "En tant que propriétaire"}
                                 </span>
                                </div>
                                </div>

                                <hr/>
                                    <div className="flex gap-4 items-start">
                                      <Link to={`/equipment/${r.rental?.equipment?.equipment_id}`}>
                                        <img src={r.rental?.equipment?.photo} alt={r.rental?.equipment?.title} className="w-16 h-16 object-cover rounded-lg shrink-0"/>
                                      </Link>
                                      <div className="flex-1">
                                        <h3 className="text-gray-900 font-medium">{r.rental?.equipment?.title}</h3>
                                        <p className="text-gray-500 text-sm">Du {FormatDate(r.rental?.start_date)}</p>
                                        <p className="text-gray-500 text-sm">Au {FormatDate(r.rental?.end_date)}</p>
                                      </div>
                                      <div className="text-right shrink-0">
                                        <p className="text-xl text-primary">{r.rental?.total_price} €</p>
                                        <p className="text-sm text-gray-500">Total</p>
                                      </div>
                                    </div>

                                </div>
                                ))}
                                       
                         </div>
                            ) : (
                          <div className="text-center py-12 text-gray-600">
                            <p>Aucun avis donné pour le moment</p>
                          </div>
                         )}
        </>
    )
}