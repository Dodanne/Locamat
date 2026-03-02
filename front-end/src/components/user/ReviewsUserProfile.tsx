import StarRating from "../../components/StarRating";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hook/useUsers";
import Loader from "../Loader";
import { User } from "../../types/User";
import { useReviews } from "../../hook/useReviews";
import { ReviewUser } from "../../types/Review_user";
import getInitials from "../GetInitials";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import FormatDate from "../FormatDate";


export default function ReviewsUserProfile(){
    const {user_id}=useAuth()
    const {getUserById}=useUsers()
    const {getUserReviews}=useReviews()
    const [user, setUser] = useState<User|null>(null);
    const [userReviews, setUserReviews] = useState<ReviewUser[]>([]);
     const baseUrl=import.meta.env.VITE_BASE_URL

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

    useEffect(() => {
        if(!user_id) return
        const id= user_id
        async function fetchUserReviews(){
    try{
        const data= await getUserReviews(id)
         setUserReviews(data)
         
     }catch(err){
            console.log(err)
        }
    }fetchUserReviews()
    }, [user_id])
    
    if(!user) return <Loader/>
    
    return (
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
                    {userReviews.length > 0 ? (
                        
                         <div className="flex flex-col gap-4">
                           {userReviews.map((r) => (
                                  <div key={r.reviews_user_id} className="bg-white rounded-xl border p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        {r.reviewer?.photo && r.reviewer?.photo !=="NULL" ? (  
                                         <img src={`${baseUrl}/images/users/${r.reviewer?.photo}`} alt={r.reviewer?.first_name} className="w-12 h-12 object-cover rounded-full mr-4"/>
                                           ):(
                                              <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-accent rounded-full mr-4">{getInitials(r.reviewer)}</span>
                                           )
                                       }
                                        <div>
                                          <p className="font-semibold text-gray-900">
                                            {r.reviewer
                                              ? `${r.reviewer.first_name} ${r.reviewer.last_name}`
                                              : "Utilisateur supprimé"}
                                          </p>
                                          <p className=" text-gray-600">
                                            {FormatDate(r.createdAt)}
                                          </p>
                                          <div className=" text-gray-600 flex items-center">
                                            <IoLocationOutline className="text-gray-600"/> 
                                            <p>{r.reviewer?.city}</p>
                                          </div>
                                        </div>
                                        <div className="ml-9">
                                        <p className="text-gray-900 ">{r.comment}</p>
                                    <span className="text-sm text-gray-600 italic">
                                      {r.status === "renter" ? "En tant que locataire" : "En tant que propriétaire"}
                                    </span>
                                    </div>
                                      </div>
                                      

                                      
                                      <div className="flex items-center gap-1">
                                        <div>
                                         <div className="flex  gap-6">
                                             <Link to={`/equipment/${r.rental?.equipment?.equipment_id}`}>
                                                <img src={`${baseUrl}/images/equipments/${r.rental?.equipment?.photo}`} alt={r.rental?.equipment?.title} className="w-24 h-24 object-cover rounded-lg"></img>
                                            </Link>
                                            <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                    <div>
                                     <h3 className="text-xl text-gray-900 mb-3">{r.rental?.equipment?.title}</h3>
                                    <div className="flex items-center justify-between">
                                    <div className="text-gray-600">
                                        <p>Du {FormatDate(r.rental?.start_date)} <br />
                                        au {FormatDate(r.rental?.end_date)}</p>
                                    </div>
                                    </div>
                                                  
                                    </div>
                                     <div className="m-5">
                                         <p className="text-2xl text-primary">{r.rental?.total_price} €</p>
                                         <p className="text-sm text-gray-500">Total</p>
                                        </div>  
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                        <StarRating rating={r.rating} />
                                        <span className="text-sm text-gray-600">({r.rating}/5)</span>
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