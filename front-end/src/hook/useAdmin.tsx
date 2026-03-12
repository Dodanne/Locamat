import apiAuth from "../api/axiosAuth";

export function useAdmins(){
   
    async function getAdmins() {
      try {
        const res = await apiAuth.get( "/role/admin");
        return Array.isArray(res.data) ? res.data : [] 
      } catch (err) {
        console.log(err);
        return []
      }
    }
    async function deleteAdmin (userId: number){
        try {
           await apiAuth.patch(`/${userId}/isAdmin`, {role:"user"}) 
         } catch (err) {
           console.log(err)
           throw err
       }
    }
     
    return{getAdmins, deleteAdmin}
}