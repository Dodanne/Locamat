
import { useState } from "react";
import {usePaiement} from "./../hook/usePaiement"

type StripePaiementProps = {
  rental_id: number;
};

export default function StripePaiement({rental_id}: StripePaiementProps){
    const {postSession}=usePaiement()
    const [error, setError] = useState("")

    const handleClick=async()=>{
            try{
                const data = await postSession(rental_id)
                    window.location.href = data.url;    
            } catch (err){
                console.log (err)
                setError ("Une erreur est survenue, veuillez réessayer ultérieurement")
            }

    }
    return (
        <>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleClick} className="btn bg-accent w-2/4 text-white">Payer</button>
        </>
    )
}