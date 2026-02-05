import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  isLogged: boolean;
  userId: string | null;
  user:any|null;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

type User = {
  id: string;
  email?: string;
  first_name?: string;
};

const AuthContext=createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState<User | null>(null);
  const isLogged = !!token;

   useEffect(() => {
   const fetchUser = async () => {
      if (!token || !userId) return;
      try {
        const res = await fetch(`http://localhost:3033/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err)
        logout();
      }
    };

    fetchUser();
  }, [token, userId]);

   const login = (token: string, id: string) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, userId, user, login, logout }}>
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