import { RiSecurePaymentFill } from "react-icons/ri";
import { TbCalendarCancel } from "react-icons/tb";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { fr } from "react-day-picker/locale";
import { DayPicker, DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import { Equipment } from "../../types/Equipment";
import { useAuth } from "../../context/AuthContext";
import { useRentals } from "../../hook/useRentals";

type ReservationsProps = {
  equipment: Equipment;
};

export default function Reservations({equipment}: ReservationsProps){
    const {user_id}=useAuth()
    const [selected, setSelected] = useState<DateRange| undefined>()
    const navigate=useNavigate()
    const {postRental}=useRentals()
    
    const handleClick = async ()=> {
        if (!equipment) return;
        if (user_id && equipment.owner_id===parseInt(user_id)){
            alert ("Vous ne pouvez pas réserver votre propre matériel")
        return 
        }
        if (!selected?.from || !selected?.to) {
            alert("Merci de bien vouloir selectionner des dates");
             return 
        }
            try {
                  const form = {
                     start_date: selected.from.toISOString().split("T")[0],
                     end_date: selected.to.toISOString().split("T")[0],
                     total_price: totalPrice,
                     status: "pending",
                     equipment_id: equipment.equipment_id,
                 };
            await postRental(form)
            navigate(`/summary-rental`)
        }catch (err){
            console.log(err)
        }
    }

        const  numberOfDays = ()=>{
            if (!selected?.from || !selected?.to) return 0
            const start:Date= selected.from
            const end:Date= selected.to
            
            const diffDate=end.getTime() - start.getTime()
            
            return diffDate
        }
        const days=numberOfDays()/(1000 * 60 * 60 * 24) + 1;
        if (!equipment) return <Loader/>;
         const totalPrice=days*equipment.price

    return(
         <>
            <div className="lg:col-span-1 ">
                <div  className="bg-white flex flex-col gap-6 rounded-xl border sticky top-24 p-8 ">
                <div className=" flex-col text-center ">
                    <div className="text-3xl text-primary font-semibold">{equipment.price}€ 
                    </div>
                <span className=" text-gray-500"> par jour</span>
                </div>
                <hr />
                 <DayPicker
                        animate
                        mode="range" required
                        selected={selected}
                        onSelect={setSelected}
                        disabled={{ before: new Date() }
                    // ajouter les non disponibilites
                    }
                        weekStartsOn={1} 
                        modifiersClassNames={{
                            selected: "bg-accent text-black rounded",  
                            range_start: "bg-accent text-black rounded-l-full",
                            range_end: "bg-accent text-black rounded-r-full",   
                            today: "text-primary font-bold",   
                        }}
                        className=" p-2 " 
                        components={{
                            Chevron: ({ orientation }) => {
                                 return orientation === "left"
                                ? <IoChevronBack className="text-accent w-6 h-6 " />
                                : <IoChevronForward  className="text-accent w-6 h-6" />;
                                 }
                                    }}
                        navLayout="around"
                        locale={fr}
                         />
                    {selected && (
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                            <span className="font-semibold">{equipment.price} € x {days} {days===1?"jour":"jours"}</span> <br />
                            <span className="font-bold">{totalPrice} €</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="font-semibold ">Caution </span>
                            <span className="font-semibold">{equipment.caution } €</span>
                            </div>
                            <hr className="border-gray-400"/>
                            <div className="flex justify-between">
                            <span className="font-bold text-primary text-xl ">Total </span>
                            <span className="font-semibold text-3xl text-primary">{totalPrice} €</span> 
                            </div>
                            <span className="flex text-sm text-gray-600 text-center">La caution sera restituée après le retour du matériel en bon état</span>
                        </div>
                    
                )

                }
                <button onClick={handleClick} className="btn flex-1 items-center rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition cursor-pointer">Réserver</button> 
                
                <span className="flex text-sm text-gray-600"><RiSecurePaymentFill className="text-xl mr-4"/> Paiement sécurisé</span>
                <span className="flex text-sm text-gray-600"><TbCalendarCancel className="text-xl mr-4"/> Annulation gratuite 24h avant</span>
            </div>
            </div>
            </>
    )

}