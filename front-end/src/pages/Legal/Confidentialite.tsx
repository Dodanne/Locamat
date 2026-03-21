export default function Confidentialite() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
      <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : mars 2026</p>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Responsable du traitement</h2>
        <p>
          LocaMat est responsable du traitement de vos données personnelles. Contact :{' '}
          <a className="text-accent underline">dorianelacaud@gmail.com</a>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Données collectées</h2>
        <p>Nous collectons les données suivantes :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Nom, prénom, date de naissance</li>
          <li>Adresse email et mot de passe (chiffré)</li>
          <li>Adresse postale et coordonnées GPS</li>
          <li>Numéro de téléphone</li>
          <li>Photo de profil (optionnelle)</li>
          <li>Informations professionnelles (nom société, SIRET) pour les professionnels</li>
          <li>Historique des locations et avis</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Finalités du traitement</h2>
        <p>Vos données sont utilisées pour :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Créer et gérer votre compte utilisateur</li>
          <li>Gérer les réservations et paiements</li>
          <li>Vous mettre en relation avec d'autres utilisateurs</li>
          <li>Améliorer nos services</li>
          <li>Respecter nos obligations légales</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Base légale</h2>
        <p>
          Le traitement est fondé sur l'exécution du contrat (CGU) que vous avez accepté lors de
          votre inscription.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant toute la durée de votre compte, puis 5 ans après sa
          suppression pour des raisons légales.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Partage des données</h2>
        <p>Vos données ne sont jamais vendues. Elles peuvent être partagées avec :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Stripe (paiement sécurisé)</li>
          <li>Cloudinary (hébergement des photos)</li>
          <li>Les hébergeurs (Vercel, Render, Aiven)</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition</li>
        </ul>
        <p className="mt-2">
          Pour exercer ces droits : <a className="text-accent underline">dorianelacaud@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
