import { IoLocationSharp, IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useEquipment } from "../../hook/useEquipments";
import Loader from "../../components/Loader";
import "react-day-picker/dist/style.css"
import Reservations from "../../components/equipment/Reservation";

export default function EquipmentItem() {
    
    const {id}=useParams();
    const {equipment,getEquipmentById}=useEquipment()
    
    const baseUrl=import.meta.env.VITE_BASE_URL
   
    useEffect(() => {
        if (!id) return;
        getEquipmentById(id)        
        }, [id, getEquipmentById]);

        if (!equipment) return <Loader/>;
        return (
        <div className="container py-8">
            <Link to="/rechercher" >
           <button className="btn p-3 bg-white hover:bg-gray-200"> <IoArrowBack /> Retour aux résultats</button>
           </Link>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="relative overflow-hidden py-4">
                   <img src={`${baseUrl}/images/equipments/${equipment.photo}`} alt={equipment.title} className="img-cover w-full rounded-xl h-96"/>
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
                        <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full h-16 w-16">
                         <img src={`${baseUrl}/images/users/${equipment.owner?.photo}`} alt={`${equipment.owner?.first_name} ${equipment.owner?.last_name}`} className="img-cover"/>
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
                    <div>
                        <p className="text-gray-700 leading-relaxed">Pas encore d'avis pour le moment.</p>
                    </div>
                 </div>
            </div>
           <Reservations equipment={equipment}/>
        </div>
    </div>
    )
}