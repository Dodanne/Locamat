import StarRating from "../../components/StarRating";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hook/useUsers";


export default function ReviewsUserProfile(){
    const {user_id}=useAuth()
    const {user, getUserById}=useUsers()

     useEffect(() => {
        if(!user_id)return
       getUserById(user_id)
    }, [user_id]);
    
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
                                <p className="text-gray-600">Avis reçus</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl text-primary mb-2">
                                        {Math.round((user.rating_avg || 0) * 20)}%
                                    </div>
                                <p className="text-gray-600">Taux de satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-12 text-gray-500">
                        <p>Vos avis s'afficheront ici</p>
                    </div>
                </div>
                </>
    )
}