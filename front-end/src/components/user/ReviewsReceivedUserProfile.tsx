import StarRating from "../StarRating";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hook/useUsers";
import Loader from "../Loader";
import { User } from "../../types/User";
import { useReviews } from "../../hook/useReviews";
import { ReviewUser } from "../../types/Review_user";
import getInitials from "../GetInitials";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import FormatDate from "../FormatDate";


export default function ReviewsReceivedUserProfile(){
    const {user_id}=useAuth()
    const {id}= useParams()
    const {getUserById}=useUsers()
    const {getUserReviews}=useReviews()
    const [user, setUser] = useState<User|null>(null);
    const [userReviews, setUserReviews] = useState<ReviewUser[]>([])
    const [error, setError] = useState("")

    const idProfile= id? Number(id):Number(user_id)

     useEffect(() => {
        if(!idProfile) return
        async function fetchUserById(){
     try{
        const data= await getUserById(idProfile)
         setUser(data)
     }catch(err){
            console.log(err)
            setError("Impossible de charger le profil")
        }
    }fetchUserById()
    }, [idProfile])

    useEffect(() => {
        if(!idProfile) return
       
        async function fetchUserReviews(){
    try{
        const data= await getUserReviews(idProfile)
         setUserReviews(data)
         
     }catch(err){
            console.log(err)
        }
    }fetchUserReviews()
    }, [idProfile])
    
    if(!user) return <Loader/>
    
    return (
        <>
                <div className="space-y-6 mt-3">
                  
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
                                <p className="text-gray-600">Avis {user.rating_count>1?"reçus":"reçu"}</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">
                                        0 %
                                    </div>
                                <p className="text-gray-600">Taux d'annulation</p>
                                </div>
                            </div>
                        </div>
                    </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
                            <p>Aucun avis reçu pour le moment</p>
                          </div>
                         )}
                </div>
                </>
    )
}