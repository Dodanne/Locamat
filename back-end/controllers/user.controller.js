import { User } from "./../Models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const [data] = await User.findAll();
    res.json(data);
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await User.findByPk(id);
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
};
