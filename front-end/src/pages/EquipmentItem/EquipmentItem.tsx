import { IoLocationSharp, IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useEquipment } from "../../hook/useEquipments";
import Loader from "../../components/Loader";
import "react-day-picker/dist/style.css"
import Reservations from "../../components/equipment/Reservation";
import { Equipment } from "../../types/Equipment";
import getInitials from "../../components/GetInitials";
import { useReviews } from "../../hook/useReviews";
import { ReviewEquipment } from "../../types/Review_equipment";
import { IoLocationOutline } from "react-icons/io5";
import StarRating from "../../components/StarRating";

export default function EquipmentItem() {
    const [equipment, setEquipmentById] = useState<Equipment | null>(null)
    const [equipmentReview, setEquipmentReview] = useState<ReviewEquipment[]>([])
    const {id}=useParams();
    const {getEquipmentById}=useEquipment()
    const {getEquipmentReviews}=useReviews()
   
    useEffect(() => {
        if (!id) return
        async function fetchEquipmentById(){
        try{
        const data=await getEquipmentById(id)
        setEquipmentById (data) 
        }catch(err){
            console.log(err)
        }} fetchEquipmentById()   
        }, [id]);
    
     useEffect(() => {
        if(!equipment?.equipment_id) return
        const id= equipment.equipment_id
        async function fetchEquipmentReviews(){
    try{
        const data= await getEquipmentReviews(id)
         setEquipmentReview(data)
         
     }catch(err){
            console.log(err)
        }
    }fetchEquipmentReviews()
    }, [equipment?.equipment_id])

        if (!equipment) return <Loader/>;
        return (
        <div className="container py-8">
            <Link to="/rechercher" >
           <button className="btn p-3 bg-white hover:bg-gray-200"> <IoArrowBack /> Retour aux résultats</button>
           </Link>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="relative overflow-hidden py-4">
                   <img src={equipment.photo} alt={equipment.title} className="img-cover w-full rounded-xl h-96"/>
                   <span className="inline-flex items-center justify-center rounded-md border px-2 py-1 m-2 text-xs font-medium w-fit bg-white text-primary absolute top-4 right-1"> 
                {equipment.owner?.user_type}</span>
                </div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-3xl text-gray-900 mb-2">{equipment.title}</h1>
                        <div className="flex items-center gap-4  text-gray-600">
                            <div className="flex items-center gap-1">
                             <IoLocationSharp  />
                             <span>{equipment.owner?.city} </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaStar  className="text-yellow-400"/>
                                <span className="text-gray-900">{equipment.owner?.rating_avg} </span>
                                <span className="text-gray-500">({equipment.owner?.rating_count})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span> {equipment.category?.name} </span>
                </div>
                <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
                    <div className="flex items-center gap-4 relative ">
                        <span className="relative flex size-10 shrink-0 overflow-hidden h-16 w-16">
                        {equipment.owner?.photo && equipment.owner?.photo!=="NULL" ? (  
                            <img src={equipment.owner?.photo} alt={equipment.owner?.first_name} className="w-12 h-12 object-cover rounded-full "/>
                                 ):(
                                    <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-accent rounded-full mr-4">{getInitials(equipment.owner)}</span>
                                 )
                                   } 
                        </span>
                        <div>
                            <div className="text-lg text-gray-900">{equipment.owner?.first_name} {equipment.owner?.last_name}</div>
                            <div className="text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <FaStar  className="text-yellow-400"/>
                                    <span className="text-gray-900">{equipment.owner?.rating_avg} </span>
                                    <span className="text-gray-500">({equipment.owner?.rating_count} avis)</span>
                                </div>
                            </div>
                        </div>
                    <button className="btn p-3 bg-white hover:bg-gray-200 absolute right-1"> <CiChat1 className="text-xl"/> Contacter </button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
                    <h4 className=" font-semibold text-gray-900 mb-1">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{equipment.description}</p>
                </div>
                 <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
                    <h4 className=" font-semibold text-gray-900 mb-1">Avis </h4>
                    {equipmentReview.length > 0 ? (
                          equipmentReview?.map((r) => (
                                         <div key={r.reviewed_user_id} className="bg-white rounded-xl border p-4 flex flex-col gap-2">
                                           <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                               {r.reviewer?.photo && r.reviewer?.photo !=="NULL" ? (  
                                                <img src={r.reviewer?.photo} alt={r.reviewer?.first_name} className="w-12 h-12 object-cover rounded-full mr-4"/>
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
                                                   {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                                                 </p>
                                                 <div className=" text-gray-600 flex items-center">
                                                   <IoLocationOutline className="text-gray-600"/> 
                                                   <p>{r.reviewer?.city}</p>
                                                 </div>
                                               </div>
                                               <div className="ml-9">
                                               <p className="text-gray-900 ">{r.comment}</p>
                                          
                                           </div>
                                             </div>
                                             
                                             <div className="flex items-center gap-1">
                                               <StarRating rating={r.rating} />
                                               <span className="text-sm text-gray-600">({r.rating}/5)</span>
                                             </div>
                                           </div>
                                           
                                         </div>
                                        
                                              ))
                                            ) : (
                                             <div className="text-center py-12 text-gray-600">
                                               <p>Aucun avis reçu pour le moment</p>
                                             </div>
                                            )}  
                                            </div>                          
                 </div>
                 <div className="lg:col-span-1 ">
                     <Reservations equipment={equipment}/>
                 </div>
            </div>
            
        </div>
    
    )
}