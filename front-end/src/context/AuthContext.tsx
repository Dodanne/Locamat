import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "./../types/User"
import api from "../api/axios";

type AuthContextType = {
  isLogged: boolean;
  user_id: string | null;
  user: User|null;
  login: (token: string, user_id: string) => void;
  logout: () => void;
};


const AuthContext=createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user_id, setUser_id] = useState(localStorage.getItem("user_id"));
  const [user, setUser] = useState<User | null>(null);
  const isLogged = !!token;

   useEffect(() => {
   const fetchUser = async () => {
      if (!token || !user_id) return;
      try {
        const res = await api.get(`/user/${user_id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err)
        logout();
      }
    };
    fetchUser();
  }, [token, user_id]);

   const login = (token: string, user_id: string) => {
    setToken(token);
    setUser_id(user_id);
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setToken(null);
    setUser_id(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, user_id, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context
}