export default function RGPD() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">RGPD</h1>
      <p className="text-sm text-gray-500 mb-8">Règlement Général sur la Protection des Données – Dernière mise à jour : mars 2026</p>

      

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Qu'est-ce que le RGPD ?</h2>
          <p>
            Le Règlement Général sur la Protection des Données (RGPD) est un règlement européen entré en vigueur le 25 mai 2018.
            Il encadre le traitement des données personnelles des citoyens européens et renforce leurs droits.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. L'engagement</h2>
          <p>LocaMat s'engage à :</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Collecter uniquement les données nécessaires au fonctionnement du service</li>
            <li>Ne jamais vendre vos données à des tiers</li>
            <li>Sécuriser vos données (chiffrement des mots de passe, HTTPS)</li>
            <li>Respecter vos droits et répondre à vos demandes sous 30 jours</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Stockage des données de session</h2>
          <p>
            LocaMat utilise le localStorage (stockage local) de votre navigateur pour stocker votre token d'authentification et votre identifiant utilisateur.
            Ces données restent sur votre appareil et sont supprimées lors de la déconnexion.
            Aucun cookie de traçage ou publicitaire n'est utilisé.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Transfert de données hors UE</h2>
          <p>
            Certains de nos prestataires (Vercel, Render, Stripe, Cloudinary) sont basés aux États-Unis et la base de donnée (Aiven), sur le continent asiatique.
            Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Exercer vos droits</h2>
          <p>
            Vous pouvez exercer vos droits (accès, rectification, suppression, portabilité, opposition) en nous contactant à :
            <a className="text-accent underline ml-1">dorianelacaud@gmail.com</a>
          </p>
          <p className="mt-2">
            En cas de litige, vous pouvez saisir la CNIL directement sur le site suivant : https://www.cnil.fr.
          </p>
        </div>

     
    </div>
  )
}