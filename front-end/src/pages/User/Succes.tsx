import { Link } from "react-router-dom";

export default function UserSuccess() {
  

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
            Votre compte a été créé avec succès
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10">
            Un email à été envoyé à votre adresse mail. Veuillez le confirmer dans les 24h, sinon votre compte sera bloqué. <br />
            Vous êtes maintenant prêt à louer sur LocaMat.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to={`/connexion`}
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-white text-primary text-sm font-medium hover:bg-gray-100 transition"
            >
              Se connecter
            </Link>

            
          </div>
        </div>
      </div>

    </>
  );
}
