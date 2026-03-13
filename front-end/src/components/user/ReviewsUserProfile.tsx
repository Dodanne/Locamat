import { useState } from "react"
import { useLocation } from "react-router-dom";
import ReviewsReceivedUserProfile from "./ReviewsReceivedUserProfile";
import ReviewsGivenUserProfile from "./ReviewsGivenUserProfile";
import { FiInbox } from "react-icons/fi";
import { FiSend } from "react-icons/fi";


export default function ReviewsUserProfile(){
    const location = useLocation()
    const state = location.state?.activeDiv;
    const [activeDiv,setActiveDiv]=useState(state||"received")

    return (
        < div className="flex flex-col ">
            <div className=" flex justify-center ">
                <div className={`text-gray-900 w-full rounded-xl flex justify-center  ${activeDiv==="received" ? 'bg-gray-300' : ''} `} onClick={()=>setActiveDiv("received")}>
                    <button className={`btn p-3 border-none text-xl text-gray-900  ${activeDiv==="received" ? 'underline' : ''} `} ><FiInbox /><span className="hidden md:block">Avis reçus </span> </button>
                </div>
                <div className={`text-gray-900 w-full rounded-xl flex justify-center ${activeDiv==="given" ? 'bg-gray-300' : ''} `} onClick={()=>setActiveDiv("given")}>
                    <button className={`btn p-3 border-none text-xl  text-gray-900  ${activeDiv==="given" ? ' underline' : ''} `} ><FiSend /> <span className="hidden md:block">Avis donnés</span></button>
                </div>            
            </div>
            {activeDiv==="received"&&(
                            <ReviewsReceivedUserProfile/>
                         )}
            {activeDiv==="given"&&(
                            <ReviewsGivenUserProfile/>
                         )}
         </div>
    )
}