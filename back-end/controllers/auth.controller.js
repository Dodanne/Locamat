import User from "./../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.config.js";

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email.trim() } });
    if (!user) {
      return res.json({ message: "Email ou mot de passe invalide" });
    }
    if (user.status === "banned") {
      return res.json({
        message: "Votre compte est suspendu. Contactez un administrateur.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Email ou mot de passe invalide" });
    }
    const token = jwt.sign(
      {
        id: user.user_id,
        first_name: user.first_name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.json({
      token,
      user: {
        id: user.user_id,
        first_name: user.first_name,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Erreur serveur" });
  }
};
