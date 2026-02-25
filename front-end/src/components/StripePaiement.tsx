
import {usePaiement} from "./../hook/usePaiement"

type StripePaiementProps = {
  rental_id: number;
};

export default function StripePaiement({rental_id}: StripePaiementProps){
    const {postSession}=usePaiement()
    const handleClick=async()=>{
            try{
                const data = await postSession(rental_id)
                    window.location.href = data.url;
                   
                
            } catch (err){
                console.log (err)
            }

    }
    return (
        <button onClick={handleClick} className="btn bg-accent w-2/4 text-white">Payer</button>
    )
}