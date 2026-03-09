import api from "../api/axios";
import apiAuth from "../api/axiosAuth";
import { RentalStatus } from "../types/Rental";

export function useRentals(){

    async function getRenterRentals(user_id:number) {

            try {
                const res = await apiAuth.get(`/rental/renter/${user_id}`);
                return Array.isArray(res.data) ? res.data : [] // pour ne pas avoir null=>tableau vide
               
            } catch (err) {
                console.log(err);
                return []
            }
        }
    async function getOwnerRentals(user_id:number) {
            try {
                const res = await apiAuth.get(`/rental/owner/${user_id}`);
                return Array.isArray(res.data) ? res.data : [] // pour ne pas avoir null=>tableau vide  
            } catch (err) {
                console.log(err);
                return []
            }
        }
    async function patchStatusRental ( id:number, newStatus:RentalStatus,){
        try {
                await apiAuth.patch(`/rental/status/${id}`, {status:newStatus})
              
        } catch (err){
            console.log (err)
            throw err
        }
    }
    async function postRental(form:any){
        try{
             await apiAuth.post("/rental/new-rental", form)
        }catch (err){
            console.log (err)
            throw err
        }
    }
    async function getRentalbyId(equipment_id:number){
        try{
           const res = await api.get(`/rental/${equipment_id}`)
   
           return res.data
        } catch (err){
            console.log (err)
            return []
        }
    }
        return {getRenterRentals, getOwnerRentals, patchStatusRental, postRental,  getRentalbyId}
}
