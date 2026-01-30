import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

type PropsNode = { children: ReactNode };

export default function ProtectedRoute({ children }: PropsNode){

    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/connexion");
        }
    }, [navigate]);
     return <>{children}</>
}