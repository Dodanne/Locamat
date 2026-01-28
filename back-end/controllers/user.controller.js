import { User } from "./../Models/index.js";
import bcrypt from "bcryptjs";

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
    res.json(data);
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
      photo,
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

    const data = await User.create({
      first_name,
      last_name,
      birthday,
      photo,
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
