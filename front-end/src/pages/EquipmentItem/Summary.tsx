
import { useNavigate } from "react-router-dom";


export default function Summary() {
  const navigate= useNavigate()
      
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white rounded-xl border shadow-sm p-8 max-w-xl w-full flex flex-col gap-6 text-center">
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-primary">
            Demande envoyée avec succès !
          </h2>
          <p className="text-gray-600">
            Un e-mail a été envoyé au propriétaire du matériel.
          </p>
          <p className="text-gray-600">
            Vous recevrez une notification dès qu’il aura répondu.
          </p>
          <p className="text-gray-600">
            Vous trouverez l'avancée de la réservation directement sur votre profil.
          </p>
        </div>

        <h2 className="text-xl text-primary"> Retrouvez le récapitulatif de votre demande directement sur votre profil : </h2>
        <button
          onClick={() => navigate("/user-profile", { state: { activeDiv: "locations"} })}
          className="btn bg-accent text-white px-4 py-2 rounded-md mt-4 hover:bg-[#0087BB] transition"
        >
          Voir mes réservations
        </button>
        </div>
      </div>
  )
}