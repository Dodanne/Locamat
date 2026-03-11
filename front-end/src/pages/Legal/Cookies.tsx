export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de cookies</h1>
      <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : mars 2026</p>

   

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.
            Il permet de mémoriser des informations sur votre navigation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Notre utilisation du stockage local</h2>
          <p>
            LocaMat n'utilise pas de cookies au sens traditionnel du terme.
            Nous utilisons le localStorage (stockage local) de votre navigateur, qui fonctionne différemment :
          </p>
          <ul className="mt-2 space-y-1">
            <li>Les données restent sur votre appareil uniquement</li>
            <li>Elles ne sont jamais envoyées automatiquement à nos serveurs</li>
            <li>Elles ne permettent pas de vous tracer entre différents sites</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Données stockées dans le localStorage</h2>
          <table className="w-full text-sm border rounded mt-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">Clé</th>
                <th className="px-4 py-2 border text-left">Contenu</th>
                <th className="px-4 py-2 border text-left">Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border ">token</td>
                <td className="px-4 py-2 border">Token d'authentification JWT</td>
                <td className="px-4 py-2 border">Jusqu'à la déconnexion ou 7h</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border ">user_id</td>
                <td className="px-4 py-2 border">Identifiant de l'utilisateur connecté</td>
                <td className="px-4 py-2 border">Jusqu'à la déconnexion ou 7h</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Cookies tiers</h2>
          <p>Stripe (notre prestataire de paiement) peut déposer des cookies lors du processus de paiement. Consultez la politique de confidentialité de Stripe.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Supprimer vos données locales</h2>
          <p>Vous pouvez supprimer les données stockées dans votre navigateur à tout moment :</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>En vous déconnectant de LocaMat</li>
            <li>En vidant le localStorage depuis les outils développeur de votre navigateur</li>
            <li>En effaçant les données de navigation de votre navigateur</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact</h2>
          <p>Pour toute question : <a  className="text-accent underline">dorianelacaud@gmail.com</a></p>
        </div>

   
    </div>
  )
}