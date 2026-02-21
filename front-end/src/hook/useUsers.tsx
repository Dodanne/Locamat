import { useState } from "react";
import apiAuth from "../api/axiosAuth";
import api from "../api/axios";
import { User } from "../types/User";

type useUsersType={
    admin: User []
    users: User[]
    user: User
    getUsers:()=> Promise<void>
    getAdmins:()=> Promise<void>
    deleteAdmin:(userId:number)=> Promise<void>
    deleteUser:(userId:number, isBanned:boolean)=> Promise<void>
    getUserById:(user_id:string)=> Promise<void>
    postUser:(form:FormData)=>Promise<User>
}

export function useUsers(): useUsersType{
    const [admin, setAdmin] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [user,setUser]=useState<User>({}as User)
    
    async function getAdmins() {
      try {
        const res = await apiAuth.get( "/role/admin");
        setAdmin(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function deleteAdmin (userId: number){
     if (!confirm(`Êtes-vous sûr de vouloir remettre le rôle de "user" à cet administrateur ? Celui-ci perdra tous ses droits`)) return;
        try {
           await apiAuth.patch(`/${userId}/isAdmin`, {role:"user "}),
           setAdmin(prev => prev.filter(a => a.user_id !== userId))
         } catch (err) {
           console.log(err)
       }
    }
    async function getUsers() {
      try {
        const res = await apiAuth.get("/role/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function deleteUser (userId:number, isBanned: boolean){
       try {
     await apiAuth.patch(`/${userId}/ban`, { banned: !isBanned }),
     setUsers(prev =>
      prev.map(u =>
        u.user_id === userId ? { ...u, status: !isBanned ? "banned" : "active" } : u
      )
    );
  } catch (err) {
    console.log(err);
    alert("Impossible de modifier le statut");
  }
    }
    async function getUserById(user_id:string){
       try {
                const res = await apiAuth.get(`/user/${user_id}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
    }
    async function postUser(form:FormData){
      const res= await api.post("/new-user", form);
      return res.data;
    }
    return {admin, users, user, deleteAdmin, getAdmins, getUsers, deleteUser, getUserById, postUser}
}