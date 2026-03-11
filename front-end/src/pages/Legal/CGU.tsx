export default function CGU() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">CGU </h1>
      <p className="text-sm text-gray-500 mb-8">Conditions Générales d'Utilisation – Dernière mise à jour : mars 2026</p>

      

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Objet</h2>
          <p>
            Les présentes CGU régissent l'utilisation de la plateforme LocaMat, service de location de matériel entre particuliers et professionnels.
            En créant un compte, vous acceptez ces conditions sans réserve.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Inscription</h2>
          <p>L'inscription est gratuite et ouverte à toute personne majeure. Vous êtes responsable de la confidentialité de vos identifiants.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Fonctionnement de la plateforme</h2>
          <p>LocaMat met en relation des propriétaires de matériel et des locataires. LocaMat n'est pas partie au contrat de location entre les utilisateurs.</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Le propriétaire publie une annonce avec prix par jour, caution et disponibilités</li>
            <li>Le locataire effectue une demande de réservation</li>
            <li>Le propriétaire accepte ou refuse la demande</li>
            <li>Le locataire procède au paiement pour confirmer la réservation</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Prix et paiement</h2>
          <p>
            Les prix sont fixés librement par les propriétaires. Le paiement s'effectue via Stripe (carte bancaire).
            Une caution peut être demandée par le propriétaire et sera restituée après retour du matériel en bon état.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Annulation</h2>
          <p>
            L'annulation est gratuite jusqu'à 24h avant le début de la location.
            Passé ce délai, des frais peuvent s'appliquer selon la politique du propriétaire.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Responsabilités</h2>
          <p>
            Le locataire est responsable du matériel loué pendant toute la durée de la location.
            Le propriétaire garantit que le matériel est en bon état de fonctionnement.
            LocaMat ne peut être tenu responsable des litiges entre utilisateurs.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Avis</h2>
          <p>
            Suite à une location, les deux parties peuvent laisser un avis. Les avis doivent être honnêtes et respectueux.
            LocaMat se réserve le droit de supprimer tout avis ne respectant pas ces conditions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Suspension de compte</h2>
          <p>
            LocaMat se réserve le droit de suspendre tout compte en cas de non-respect des présentes conditions,
            de comportement frauduleux ou de signalement par d'autres utilisateurs.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Droit applicable</h2>
          <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français sont compétents.</p>
        </div>

    
    </div>
  )
}