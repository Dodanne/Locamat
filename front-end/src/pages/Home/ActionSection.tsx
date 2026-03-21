import { Link } from 'react-router-dom';

export default function ActionSection() {
  return (
    <>
      <div className="py-16 bg-gradient-to-r from-accent to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Vous avez du matériel à louer ?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Gagnez de l'argent en louant votre matériel inutilisé
          </p>
          <Link to="/new-equipment">
            <button className=" inline-flex items-center justify-center h-10 px-6 rounded-md bg-white text-primary text-sm font-medium hover:bg-gray-100 transition cursor-pointer">
              Commencer à louer
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
