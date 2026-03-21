export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
      <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : mars 2026</p>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Éditeur du site</h2>
        <p>Le site LocaMat est édité par une personne physique :</p>
        <ul className="mt-2 space-y-1 list-none">
          <li>
            <span className="font-medium">Nom:</span> Lacaud
          </li>
          <li>
            <span className="font-medium">Prénom :</span> Doriane
          </li>
          <li>
            <span className="font-medium">Email :</span> dorianelacaud@gmail.com
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Hébergement</h2>
        <p>Le site est hébergé par :</p>
        <ul className="mt-2 space-y-1">
          <li>
            <span className="font-medium">Front-end :</span> Vercel{' '}
          </li>
          <li>
            <span className="font-medium">Back-end :</span> Render{' '}
          </li>
          <li>
            <span className="font-medium">Base de données :</span> Aiven{' '}
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu du site LocaMat (textes, images, logos, icônes) est protégé par le
          droit d'auteur. Toute reproduction, distribution ou utilisation sans autorisation
          préalable est interdite.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          4. Limitation de responsabilité
        </h2>
        <p>
          LocaMat s'efforce d'assurer l'exactitude des informations publiées sur le site mais ne
          peut garantir leur exhaustivité. LocaMat ne saurait être tenu responsable des dommages
          directs ou indirects résultant de l'utilisation du site.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact</h2>
        <p>
          Pour toute question relative aux mentions légales :{' '}
          <a className="text-accent underline">dorianelacaud@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
