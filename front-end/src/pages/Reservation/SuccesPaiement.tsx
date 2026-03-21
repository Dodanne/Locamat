import { Link } from 'react-router-dom';

export default function PaiementSuccess() {
  return (
    <div className="py-20 bg-gradient-to-r from-accent to-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary text-3xl font-bold">
            ✓
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
          Votre paiement a été validé avec succès !
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 mb-10">
          Vous pouvez dès à présent communiquer avec votre loueur. Celui-ci vous communiquera
          l'adresse de retrait ansi que l'heure du rendez-vous.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/user-profile"
            className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-white text-primary text-sm font-medium hover:bg-gray-100 transition"
          >
            Voir mon profil
          </Link>

          <Link
            to="/chat"
            className="inline-flex items-center justify-center h-11 px-8 rounded-md border border-white text-white text-sm font-medium hover:bg-white hover:text-primary transition"
          >
            Accéder à la messagerie
          </Link>
        </div>
      </div>
    </div>
  );
}
