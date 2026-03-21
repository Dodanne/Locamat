import { FiFacebook } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { isLogged } = useAuth();
  return (
    <>
      <footer className="bg-white border-t border-gray-200">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="footer-title">À propos de LocaMat</h3>
              <p className="text-sm text-gray-600 mb-4">
                La plateforme de location de matériel entre particuliers et professionnels.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="footer-link">
                  <FiFacebook />
                </a>
                <a href="#" className="footer-link">
                  <FaInstagram />
                </a>
                <a href="#" className="footer-link">
                  <FiLinkedin />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-primary mb-4">Plan du site</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="footer-link">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/rechercher" className="footer-link">
                    Rechercher du matériel
                  </Link>
                </li>
                <li>
                  <Link to="/new-equipment" className="footer-link">
                    Louer mon matériel
                  </Link>
                </li>
                {!isLogged && (
                  <>
                    <li>
                      <Link to="/connexion" className="footer-link">
                        Se connecter
                      </Link>
                    </li>
                    <li>
                      <Link to="/user-form" className="footer-link">
                        S'inscrire
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="footer-title">Informations légales</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/mentions-legales" className="footer-link">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/confidentialite" className="footer-link">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/RGPD" className="footer-link">
                    RGPD
                  </Link>
                </li>
                <li>
                  <Link to="/CGU" className="footer-link">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="footer-link">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-primary mb-4">A propos</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Link to="/" className="footer-link">
                    Contactez-nous
                  </Link>
                </li>
                <li>
                  <Link to="/" className="footer-link">
                    Qui sommes-nous ?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="container py-6">
            <div className="text-center text-sm text-gray-500">
              © 2026 LocaMat. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
