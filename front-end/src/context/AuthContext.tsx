import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  isLogged: boolean;
  userId: string | null;
  user:any|null;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  userId: null,
  user:null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
   const [user, setUser] = useState<any | null>(null);

   useEffect(() => {
  if (userId) {
    fetch(`http://localhost:3033/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }
}, [userId]);

  const login = (token: string, id: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setIsLogged(true);
    setUserId(id);
    fetch(`http://localhost:3033/user/${id}`)
          .then(res => res.json())
          .then(data => setUser(data))
          .catch(err => console.error(err));
      
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLogged(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, userId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth= () => useContext(AuthContext);