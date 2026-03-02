import api from "../api/axios"
import apiAuth from "../api/axiosAuth"


export function useReviews(){

async function postUserReview(form:any){
    try{
        await apiAuth.post('/review-user', form)
    }catch (err){
    console.log(err)
    }
}

async function postEquipmentReviews(form:any){
    try{
        await apiAuth.post('/review-equipment',form)
    } catch(err){
        console.log
    }
}

async function getUserIsReview(rental_id:number){
    try{
        const res= await apiAuth.get(`/review-user/${rental_id}`)
        return res.data
    }catch (err){
        console.log(err)
    }
}
async function getEquipmentIsReview(rental_id:number){
    try{
        const res = await apiAuth.get(`/review-equipment/${rental_id}`)
       
        return res.data
    }catch (err){
        console.log(err)
    }
}
async function getEquipmentReviews(equipment_id:number){
    try{
        const res = await api.get(`/review-equipment/equipment/${equipment_id}`)
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}
async function getUserReviews(user_id:number){
    try{
        const res = await api.get(`/review-user/user/${user_id}`)
        
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}

return {postUserReview, postEquipmentReviews, getEquipmentIsReview, getUserIsReview, getUserReviews, getEquipmentReviews}
}
