import type {User} from "../../types/User"
import {Link} from "react-router-dom"

type ChooseProfileProps= {
    users:User []}

export default function ChooseProfile({users}:ChooseProfileProps){
console.log (users)
    return ( 
    <>
    <h2>Voir le profil de : </h2>
   { users.map((u)=> (
    <div>
 <Link to={`/user-profile/${u.user_id}`}> <h3 key={u.user_id}> {u.last_name} {u.first_name}</h3> </Link>
 </div>
   ))}

    </>
    )
}
