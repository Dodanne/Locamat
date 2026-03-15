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
import { ReviewEquipment } from "../../types/Review_equipment"
import { FaStar } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

export default function ReviewsGivenUserProfile(){
     const {user_id}=useAuth()
     const {getUserGivenReviews, patchUserReview, patchEquipmentReview}=useReviews()
     const [userReviews, setUserReviews] = useState<ReviewUser[]>([])
     const [equipmentReviews, setEquipmentReviews] = useState<ReviewEquipment[]>([])
     const [rating,setRating]=useState(5)
     const [comment,setComment]=useState("")
     const [updateUserReview,setUpdateUserReview ] = useState <number | null>(null)


 useEffect(() => {
        if(!user_id) return
        async function fetchUserGivenReviews(){
    try{
        const data= await getUserGivenReviews(Number(user_id))
         setEquipmentReviews(data.equipmentReviews)
         setUserReviews(data.userReviews)
         
     }catch(err){
            console.log(err)
        }
    }fetchUserGivenReviews()
    }, [user_id])

    async function handleUserReviewUpdate(reviewed_user_id:number, comment:string, rating:number){
      try {
          await patchUserReview(reviewed_user_id,{comment,rating})
          
          setUserReviews(prev=>prev.map(r=> r.reviews_user_id === reviewed_user_id? {...r,comment,rating} : r))
          setUpdateUserReview(null)
      } catch (err){
        console.log(err)
      }
    }
    
    if(!user_id) return <Loader/> 

    return (
        <>
         <div className="space-y-6 mt-3">
                    {userReviews.length > 0 ? (
                        
                         <div className="flex flex-col gap-4 ">
                           {userReviews.map((r) => (
                            <div key={r.reviews_user_id} className="bg-white rounded-xl border p-4 space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    {r.reviewedUser?.photo && r.reviewedUser?.photo !== "NULL" ? (
                                      <img src={r.reviewedUser?.photo} className="w-10 h-10 object-cover rounded-full shrink-0"/>
                                    ) : (
                                      <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-accent rounded-full shrink-0">
                                        {getInitials(r.reviewedUser)}
                                      </span>
                                    )}
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        {r.reviewedUser ? `${r.reviewedUser.first_name} ${r.reviewedUser.last_name}` : "Utilisateur supprimé"}
                                      </p>
                                      <p className="text-gray-500 text-sm">{FormatDate(r.createdAt)}</p>
                                      <div className="flex items-center text-gray-500 text-sm">
                                        <IoLocationOutline/><span>{r.reviewedUser?.city}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    {updateUserReview === r.reviews_user_id? (
                                   <div className="flex gap-2 text-2xl cursor-pointer">
                                             {[1, 2, 3, 4, 5].map((starUser) => (
                                               <label className="cursor-pointer">
                                               <input type="radio" name="ratingUser" value={starUser} className="hidden" onChange={()=>setRating(starUser)}/>
                                                  <FaStar className={starUser<=rating ? "text-yellow-400":"text-gray-300"}/>
                                               </label>
                                             ))}
                                           </div>        
                                ):(
                                 <StarRating rating={r.rating}/>
                                 )}
                                    
                                    <span className="text-sm text-gray-600">({r.rating}/5)</span>
                                  </div>
                                </div>

                                   <div className="flex justify-center">
                                   <div className="bg-gray-100 rounded-lg p-4 relative border-l-4 border-accent text-center md:w-2/3">
                                {updateUserReview === r.reviews_user_id? (
                                  < textarea className="w-full p-2 rounded border" rows={3} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                                ):(
                                 <p className="text-gray-900 italic text-lg">"{r.comment}"</p>
                                 )}
                                 <span className="text-sm text-gray-500 mt-2 block">
                                   {r.status === "renter" ? "En tant que locataire" : "En tant que propriétaire"}
                                 </span>
                                <div className="absolute right-1 bottom-1">
                                  {updateUserReview === r.reviews_user_id ? (
                                    <>
                                      <button className="btn bg-white p-2 border-gray-400"
                                       onClick={()=>handleUserReviewUpdate(r.reviews_user_id, comment, rating)} >
                                      <FiSave />
                                      Sauvegarder
                                      </button>
                                      <button
                                        onClick={() => setUpdateUserReview(null)} className="btn bg-white p-2 border-gray-400" >
                                      <MdCancel />
                                      Annuler
                                      </button>
                                    </>
                                      ) : (
                                        <button className="btn bg-white p-2 border-gray-400"
                                        onClick={()=>{
                                          setUpdateUserReview(r.reviews_user_id)
                                          setComment(r.comment) 
                                          setRating(r.rating)}}>
                                    <FaEdit />
                                    Modifier 
                                    </button>
                                   )}
                                   </div>
                                </div>
                                </div>

                                <hr/>
                                    <div className="flex gap-4 items-center ">
                                      <div className="flex gap-4">
                                      <Link to={`/equipment/${r.rental?.equipment?.equipment_id}`}>
                                        <img src={r.rental?.equipment?.photo} alt={r.rental?.equipment?.title} className="w-16 h-16 object-cover rounded-lg shrink-0"/>
                                      </Link>
                                      <div className="flex-col ">
                                        <h3 className="text-gray-900 font-medium">{r.rental?.equipment?.title}</h3>
                                        <p className="text-gray-500 text-sm">Du {FormatDate(r.rental?.start_date)}</p>
                                        <p className="text-gray-500 text-sm">Au {FormatDate(r.rental?.end_date)}</p>
                                      </div>
                                      </div>
                                      <div className="flex justify-center w-2/3">
                                   {equipmentReviews.filter((er) =>  er.rental_id === r.rental_id)
                                   .map((er)=>(
                                   <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-accent text-center md:w-2/3">
                                 <p className="text-gray-900 italic text-lg">"{er.comment}"</p>
                                </div>
                                   ))}
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
              </div>
        </>
    )
}