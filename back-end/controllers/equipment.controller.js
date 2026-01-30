import { Equipment, User } from "../Models/index.js";

export const getAllEquipment = async (req, res) => {
  try {
    const data = await Equipment.findAll();
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Equipment.findByPk(id, {
      include: {
        model: User,
        as: "owner",
        //attribute
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export const getEquipmentByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Equipment.findAll({ where: { owner_id: id } });
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export const createEquipment = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const { title, description, category_id, price, caution } = req.body;
    const photo = req.file ? req.file.filename : "default.png";
    const owner_id = req.user.id;
    const data = await Equipment.create({
      title,
      description,
      category_id,
      photo: photo,
      price,
      caution,
      owner_id: owner_id,
    });
    res.json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
