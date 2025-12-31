import type { Item } from "../../types/item.js";
import { IoLocationSharp, IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";


export default function EquipmentItem() {
    const [item,setItem]=useState<Item>({} as Item);
    const {id}=useParams();
    useEffect(() => {
        async function fetchEquipmentItem() {
            try {
                const response = await fetch(`http://localhost:3000/equipment/${id}`);
                const data = await response.json();
                setItem(data);
                console.log(data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchEquipmentItem();
    }, [id]);
    return (
        <div className="container py-8">
           <button className="btn p-3 bg-white hover:bg-gray-200"> <IoArrowBack /> Retour aux résultats</button>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="relative overflow-hidden py-4">
                   <img src={item.photo} alt={item.title} className="img-cover w-full rounded-xl h-96"/>
                   <span className="inline-flex items-center justify-center rounded-md border px-2 py-1 m-2 text-xs font-medium w-fit bg-white text-primary absolute top-4 right-1"> 
                {item.user_user_type}</span>
                </div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-3xl text-gray-900 mb-2">{item.title}</h1>
                        <div className="flex items-center gap-4  text-gray-600">
                            <div className="flex items-center gap-1">
                             <IoLocationSharp  />
                             <span>{item.user_city} </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaStar  className="text-yellow-400"/>
                                <span className="text-gray-900">{item.user_rating_avg} </span>
                                <span className="text-gray-500">({item.user_rating_count})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span> catégorie : bricolage </span>
                </div>
                <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
                    <div className="flex items-center gap-4 relative ">
                        <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full h-16 w-16">
                         <img src={item.user_photo} alt={`${item.user_first_name} ${item.user_last_name}`} className="img-cover"/>
                        </span>
                        <div>
                            <div className="text-lg text-gray-900">{item.user_first_name} {item.user_last_name}</div>
                            <div className="text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <FaStar  className="text-yellow-400"/>
                                    <span className="text-gray-900">{item.user_rating_avg} </span>
                                    <span className="text-gray-500">({item.user_rating_count} avis)</span>
                                </div>
                            </div>
                        </div>
                    <button className="btn p-3 bg-white hover:bg-gray-200 absolute right-1"> <CiChat1 className="text-xl"/> Contacter </button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
                    <h4 className=" font-semibold text-gray-900 mb-1">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
                 <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 mt-8">
                    <h4 className=" font-semibold text-gray-900 mb-1">Avis </h4>
                    <div>
                        <p className="text-gray-700 leading-relaxed">Pas encore d'avis pour le moment.</p>
                    </div>
                 </div>
            </div>
            <div className="lg:col-span-1">
                <div  className="bg-white flex flex-col gap-6 rounded-xl border sticky top-24">
            
                <div className="text-3xl text-primary font-medium">{item.price}€ <span className="text-sm text-gray-500 font-normal">par jour</span></div>
                <button className="btn btn-primary w-full py-3">Réserver</button>
                <div className="text-gray-700">
                    <h3 className="text-lg text-gray-900 mb-2">Caution</h3>
                    <p>{item.caution}€</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}