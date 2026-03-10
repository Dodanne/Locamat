import User from "./../models/User.js";
import sendEmail from "../services/email.service.js";
import {
  signEmailVerifyToken,
  verifyEmailVerifyToken,
} from "../services/emailToken.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }
    res.json(data.toJSON());
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      birthday,
      email,
      password,
      number,
      street,
      postal_code,
      city,
      latitude,
      longitude,
      phone,
      user_type,
      compagny_name,
      siret,
    } = req.body;
    const photo = req.file ? req.file.path : null;

    const data = await User.create({
      first_name,
      last_name,
      birthday,
      photo: photo,
      email,
      password,
      number,
      street,
      postal_code,
      city,
      latitude,
      longitude,
      phone,
      user_type,
      compagny_name: user_type === "professionnel" ? compagny_name : null,
      siret: user_type === "professionnel" ? siret : null,
      email_verified: false,
    });
    res.json(data);
    try {
      const emailToken = signEmailVerifyToken(email);
      const verifyUrl = `${process.env.FRONT_URL}/verify-email?token=${emailToken}`;
      await sendEmail(
        email,
        "Locamat - Veuillez confirmer votre adresse mail",
        `<h1> Bienvenue chez LocaMat</h1>
         <p>Merci d'avoir créé un compte ! Pour profiter de celui-ci, veuillez confirmer votre adresse mail en cliquant ci-dessous :</p>
      <a href="${verifyUrl}">Confirmer mon adresse email (ce lien est valide pendant 24h).</a>
      <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    `,
      );
    } catch (emailErr) {
      console.log("Erreur envoi email:", emailErr);
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const messages = err.errors.map((e) => e.messages);
      return res.status(400).json({ errors: messages });
    }
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getAllRoleUsers = async (req, res) => {
  try {
    const data = await User.findAll({ where: { role: "user" } });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getAllRoleAdmin = async (req, res) => {
  try {
    const data = await User.findAll({
      where: { role: "ADMIN" },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erreur serveur" });
  }
};
export const patchBannedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { banned } = req.body;
    if (req.user.id === id) {
      return res
        .status(403)
        .json({ message: "Impossible de se bannir soi-même" });
    }

    const data = await User.findByPk(id);
    data.status = banned ? "banned" : "active";

    await data.save();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const patchIsAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    data.role = "user";
    await data.save();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = verifyEmailVerifyToken(token);

    const user = await User.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    user.email_verified = true;
    await user.save();

    res.status(200).json({
      message: "Email vérifié avec succès ",
    });
    return res.redirect(`${process.env.FRONT_URL}/email-verified`);
  } catch (err) {
    res.status(400).json({
      message: "Lien invalide ou expiré",
    });
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const patchUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      birthday,
      email,
      password,
      number,
      street,
      postal_code,
      city,
      phone,
      user_type,
      compagny_name,
      siret,
      latitude,
      longitude,
    } = req.body;

    const data = await User.findByPk(id);
    data.first_name = first_name;
    data.last_name = last_name;
    data.birthday = birthday;
    data.email = email;
    data.number = number;
    data.street = street;
    data.postal_code = postal_code;
    data.city = city;
    data.phone = phone;
    data.user_type = user_type;
    data.compagny_name = compagny_name ?? null;
    data.siret = siret ?? null;
    data.longitude = longitude ?? null;
    data.latitude = latitude ?? null;

    if (password && password.trim() !== "") {
      data.password = password;
    }
    if (req.file) {
      data.photo = req.file.path;
    }
    await data.save();
    res.json(data);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const messages = err.errors.map((e) => e.messages);
      return res.status(400).json({ errors: messages });
    }
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
