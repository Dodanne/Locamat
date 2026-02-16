import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function EmailChecked() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  

 useEffect(() => {
  if(!token) return
  async function fetchVerifiedItems() {
    try {
      await api.get(`/verify-email?token=${token}`);
    } catch (err) {
      console.error(err);
    }
  }
  fetchVerifiedItems();
  const timer = setTimeout(() => {
    navigate("/connexion");
  }, 3000);
  return () => clearTimeout(timer);
}, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Email vérifié 🎉</h1>
      <p className="mb-4">L'adresse email a bien été confirmée.</p>
      <p>Redirection vers la page de connexion...</p>
    </div>
  );
}
