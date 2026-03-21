import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from './../types/User';
import apiAuth from '../api/axiosAuth';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isLogged: boolean;
  user_id?: number | null;
  user: User | null;
  error: string | null;
  login: (token: string, user_id: number) => void;
  logout: () => void;
  postLogin: (email: string, password: string) => void;
  getVerifiedEmail: () => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user_id, setUser_id] = useState(Number(localStorage.getItem('user_id')) || null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isLogged = !!token;

  useEffect(() => {
    const getUser = async () => {
      if (!token || !user_id) return;
      try {
        const res = await apiAuth.get(`/user/${user_id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
        logout();
      }
    };
    getUser();
  }, [token, user_id]);

  function login(token: string, user_id: number) {
    setToken(token);
    setUser_id(user_id);
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', String(user_id));
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setToken(null);
    setUser_id(null);
    setUser(null);
  }

  async function postLogin(email: string, password: string) {
    try {
      const res = await api.post('/login', { email, password });
      login(res.data.token, res.data.user.id);
      navigate(`/user-profile`);
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message);
    }
  }

  async function getVerifiedEmail() {
    if (!token) return;
    try {
      await api.get(`/verify-email?token=${token}`);
      navigate('/connexion');
    } catch (err) {
      console.log(err);
      setError('Lien de vérification invalide');
    }
  }
  return (
    <AuthContext.Provider
      value={{
        error,
        isLogged,
        user_id,
        user,
        setUser,
        setError,
        login,
        logout,
        postLogin,
        getVerifiedEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
