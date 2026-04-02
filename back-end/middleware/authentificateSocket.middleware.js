import jwt from "jsonwebtoken";

export default function authentificateSocket(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Erreur d'authentification: Token manquant"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user_id = decoded.id;
    next();
  } catch (err) {
    return next(new Error("Erreur d'authentification: Token invalide"));
  }
}
