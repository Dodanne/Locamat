import User from "./../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.config.js";

export const postLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email.trim() } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        first_name: user.first_name,
        // rajouter le role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );
    console.log("Login OK," + token);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
