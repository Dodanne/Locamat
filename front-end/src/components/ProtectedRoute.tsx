import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Connexion from '../pages/User/Connexion';

type PropsNode = { children: ReactNode };

export default function ProtectedRoute({ children }: PropsNode) {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Connexion />;
  }

  return <>{children}</>;
}
