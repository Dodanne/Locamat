import { useState } from "react";
import apiAuth from "../api/axiosAuth";
import { Rental, RentalStatus } from "../types/Rental";

export function useRentals(){
    const [renterRentals,setRenterRentals]=useState<Rental[]>([])
    const [ownerRentals,setOwnerRentals]=useState<Rental[]>([])

    async function getRenterRentals(user_id:string) {

            try {
                const res = await apiAuth.get(`/rental/renter/${user_id}`);
                setRenterRentals( Array.isArray(res.data) ? res.data : [] )// pour ne pas avoir null=>tableau vide
               
            } catch (err) {
                console.log(err);
            }
        }
    async function getOwnerRentals(user_id:string) {
            try {
                const res = await apiAuth.get(`/rental/owner/${user_id}`);
                setOwnerRentals(Array.isArray(res.data) ? res.data : []); // pour ne pas avoir null=>tableau vide
                
            } catch (err) {
                console.log(err);
            }
        }
    async function patchStatusRental ( id:number, newStatus:RentalStatus,){
        try {
                await apiAuth.patch(`/rental/status/${id}`, {status:newStatus})
                setOwnerRentals(prev =>prev.map(r =>r.rental_id === id ? { ...r, status: newStatus } : r)
    )
        } catch (err){
            console.log (err)
        }
    }
    async function postRental(form:any){
        try{
             await apiAuth.post("/rental/new-rental", form)
        }catch (err){
            console.log (err)
        }
    }
        return {renterRentals, ownerRentals,getRenterRentals, getOwnerRentals, patchStatusRental, postRental}
}