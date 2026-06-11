import { useState } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('cookie-banner');
  });

  const handleClose = () => {
    localStorage.setItem('cookie-banner', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          Cette application utilise uniquement des données de stockage nécessaires à son
          fonctionnement. Aucun cookie publicitaire ou de suivi n'est utilisé.
        </p>

        <button onClick={handleClose} className="btn-primary">
          J'ai compris
        </button>
      </div>
    </div>
  );
}
