import { FaSearch } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import { FaRegCreditCard } from 'react-icons/fa';
import { VscTools } from 'react-icons/vsc';

export default function ProcessSteps() {
  return (
    <>
      <div className="section-white">
        <div className="container">
          <h2 className="section-title">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Etape 1  */}
            <div className="text-center">
              <div className="processSteps-icon">
                <FaSearch className="icon-white" />
              </div>
              <h3 className="text-lg mb-2 text-blackText">1. Recherchez</h3>
              <p className="text-gray-600">
                Trouvez le matériel dont vous avez besoin près de chez vous
              </p>
            </div>
            {/* Etape 2 */}
            <div className="text-center">
              <div className="processSteps-icon">
                <FaRegMessage className="icon-white" />
              </div>
              <h3 className="text-lg mb-2 text-blackText">2. Contactez</h3>
              <p className="text-gray-600">
                Échangez avec le propriétaire via notre messagerie sécurisée
              </p>
            </div>
            {/* Etape 3 */}
            <div className="text-center">
              <div className="processSteps-icon">
                <FaRegCreditCard className="icon-white" />
              </div>
              <h3 className="text-lg mb-2 text-blackText">3. Réservez</h3>
              <p className="text-gray-600">
                Payez en ligne de manière sécurisée et confirmez votre réservation
              </p>
            </div>
            {/* Etape 4 */}
            <div className="text-center">
              <div className="processSteps-icon">
                <VscTools className="icon-white" />
              </div>
              <h3 className="text-lg mb-2 text-blackText">4. Profitez</h3>
              <p className="text-gray-600">
                Récupérez le matériel et profitez-en en toute sérénité
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
