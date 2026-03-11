import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useUsers } from "../../hook/useUsers";
import { User } from "../../types/User";
import FormatDate from "../FormatDate";

export default function ListeUtilisateurs() {
  const { getUsers, deleteUser}=useUsers()
  const [filterName, setFilterName] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortDate, setSortDate] = useState<string>("recent");
  const [users,setUsers]=useState<User []>([])
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchUsers(){
      try{
        const data= await getUsers();
        setUsers(data||[])
        }catch(err){
          console.log (err)
          
        }
      } fetchUsers()
  }, []);
  
     const handleBan = async (userId: number, isBanned: boolean) => {
     if (!confirm(`Êtes-vous sûr de vouloir ${isBanned ? "débannir":"bannir"} cet utilisateur ?`)) return;
     try{
      await deleteUser(userId,isBanned)
      setUsers(prev =>prev.map(u => u.user_id === userId ? { ...u, status: !isBanned ? "banned" : "active" } : u ))
        }catch(err){
          console.log(err)
          setError("Impossible de supprimer l'utilisateur")
        }}
const filteredUsers = users
  .filter(u => (`${u.first_name} ${u.last_name}`).toLowerCase().includes(filterName.toLowerCase()) )
  .filter(u => filterType === "all" || u.user_type === filterType)
  .filter(u => filterStatus === "all" || u.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDate === "recent" ? dateB - dateA : dateA - dateB;
    });
  return (
  <div className="overflow-x-auto">
    <h2 className="text-2xl font-semibold mb-4">Liste des utilisateurs</h2>
     <input type="text" placeholder="Rechercher un utilisateur..." className="border p-2 rounded mb-4 w-full" value={filterName} onChange={e => setFilterName(e.target.value)} />
     <div className="pb-4 m-2">
        <select className="border p-2 mx-2 " value={filterType} onChange={e => setFilterType(e.target.value) } >
          <option value="all">Tous types</option>
          <option value="professionnel">Professionnel</option>
          <option value="particulier">Particulier</option>
        </select>
         <select className="border p-2 mx-2 " value={filterStatus} onChange={e => setFilterStatus(e.target.value)} >
          <option value="all">Tous statuts </option>
          <option value="active">Actif</option>
          <option value="banned">Bannis</option>
        </select>
        <select className="border p-2 mx-2 " value={sortDate} onChange={e => setSortDate(e.target.value) }>
          <option value="recent">Inscriptions recentes</option>
          <option value="oldest">Premieres inscriptions</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    <table className="min-w-full bg-white border rounded shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-2 border whitespace-nowrap">Nom</th>
          <th className="py-2 px-2 border whitespace-nowrap">Prénom</th>
          <th className="py-2 px-2 border whitespace-nowrap">Email</th>
          <th className="py-2 px-2 border whitespace-nowrap">Type utilisateur</th>
          <th className="py-2 px-2 border whitespace-nowrap">Société</th>
          <th className="py-2 px-2 border whitespace-nowrap">SIRET</th>
          <th className="py-2 px-2 border whitespace-nowrap">Statut</th>
          <th className="py-2 px-2 border whitespace-nowrap">Créé le</th>
          <th className="py-2 px-2 border whitespace-nowrap">Message d'avertissement</th>
          <th className="py-2 px-2 border whitespace-nowrap">Bannir</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(u => (
          <tr key={u.user_id} className="hover:bg-gray-50">
            <td className="py-2 px-2 border cursor-pointer whitespace-nowrap "  onClick={() => setFilterName(`${u.first_name} ${u.last_name}`)}>{u.last_name}</td>
            <td className="py-2 px-2 border cursor-pointer whitespace-nowrap"  onClick={() => setFilterName(`${u.first_name} ${u.last_name}`)}>{u.first_name}</td>
            <td className="py-2 px-2 border whitespace-nowrap">{u.email}</td>
            <td className="py-2 px-2 border whitespace-nowrap">{u.user_type}</td>
            <td className="py-2 px-2 border whitespace-nowrap">{u.compagny_name || "-"}</td>
            <td className="py-2 px-2 border whitespace-nowrap">{u.siret || "-"}</td>
            <td className="py-2 px-2 border whitespace-nowrap">{u.status || "-"}</td>
            <td className="py-2 px-2 border whitespace-nowrap">{FormatDate(u.createdAt)}</td>
            <td className="justify-center border text-center"> <button ><IoIosWarning /></button></td>  
            <td className="justify-center border text-center ">
               <button  onClick={() => handleBan(u.user_id, u.status === "banned")} className={`flex items-center gap-1 mx-auto 
               ${ u.status === "banned" ? "text-red-600" : "text-primary"}`} >
              {u.status === "banned" ? "Débannir" : "Bannir"}<MdDelete /></button></td>  
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
