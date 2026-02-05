import { User } from "./../Models/index.js";
import { Op } from "sequelize";

export const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    res.json(data.toJSON());
  } catch (err) {
    console.error(err);
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
      phone,
      user_type,
      compagny_name,
      siret,
    } = req.body;
    const photo = req.file ? req.file.filename : null;

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
      phone,
      user_type,
      compagny_name: user_type === "professionnel" ? compagny_name : null,
      siret: user_type === "professionnel" ? siret : null,
    });
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const getAllRoleUsers = async (req, res) => {
  try {
    const data = await User.findAll({ where: { role: "user" } });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erreur serveur" });
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
    console.log(banned);
    const data = await User.findByPk(id);
    data.status = banned ? "banned" : "active";
    console.log(data.status);
    await data.save();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Erreur serveur" });
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
    res.status(500).json({ err: "Erreur serveur" });
  }
};
