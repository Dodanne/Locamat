import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Deconnexion() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();

    const timer = setTimeout(() => {
      navigate('/');
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-primary mb-4">Vous avez été déconnecté</h1>

        <p className="text-gray-600 mb-6">
          Votre session est terminée. À très bientôt sur LocaMat.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/connexion"
            className="h-10 flex items-center justify-center rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition"
          >
            Se reconnecter
          </Link>

          <Link to="/" className="text-sm underline text-gray-500 hover:text-primary">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
