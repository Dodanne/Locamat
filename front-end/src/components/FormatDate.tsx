
export default function FormatDate(date:string|undefined){
     if (!date) return ""
   return new Date(date).toLocaleDateString("fr-FR",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit"

    })
}