import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EquipmentSuccess() {
  const { user_id } = useAuth();

  return (
    <>
      <div className="py-20 bg-gradient-to-r from-accent to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary text-3xl font-bold">
              ✓
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            Matériel ajouté avec succès
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10">
            Il est maintenant en ligne et prêt à être loué sur LocaMat.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/user-profile"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-white text-primary text-sm font-medium hover:bg-gray-100 transition"
            >
              Voir mon équipement
            </Link>

            <Link
              to="/new-equipment"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md border border-white text-white text-sm font-medium hover:bg-white hover:text-primary transition"
            >
              Ajouter un autre équipement
            </Link>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visible immédiatement
            </h3>
            <p className="text-gray-600">
              Le matériel apparaît dès maintenant dans les recherches.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gestion simple
            </h3>
            <p className="text-gray-600">
              Modification tes tarifs et disponibilités à tout moment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Revenus sécurisés
            </h3>
            <p className="text-gray-600">
              Louez en toute confiance grâce au cadre LocaMat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
