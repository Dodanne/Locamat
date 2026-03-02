import apiAuth from "../api/axiosAuth";
import api from "../api/axios";


export function useUsers(){

    async function getUsers() {
      try {
        const res = await apiAuth.get("/role/users");
        return Array.isArray(res.data) ? res.data : []
      } catch (err) {
        console.log(err);
      }
    }
    async function deleteUser (userId:number, isBanned: boolean){
       try {
     await apiAuth.patch(`/${userId}/ban`, { banned: !isBanned })
    } catch (err) {
    console.log(err);
    alert("Impossible de modifier le statut");
  }
    }
    async function getUserById(user_id:number){
       try {
              const res = await apiAuth.get(`/user/${user_id}`);
               return res.data
            } catch (err) {
                console.log(err);
            }
    }
    async function postUser(form:FormData){
      const res= await api.post("/new-user", form);
      return res.data;
    }
    return { getUsers, deleteUser, getUserById, postUser}
}