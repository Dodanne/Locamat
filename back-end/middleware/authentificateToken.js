import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.config.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("jwt sercet" + JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalide" });
  }
};
