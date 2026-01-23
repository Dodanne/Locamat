import { Equipment, User } from "../Models/index.js";

export const getAllEquipment = async (req, res) => {
  try {
    const [data] = await Equipment.findAll();
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
        attributes: [
          "id",
          "user_type",
          "city",
          "rating_avg",
          "rating_count",
          "first_name",
          "last_name",
          "photo",
        ],
      },
    });
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getEquipmentByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await Equipment.findAll({ where: { owner_id: id } });
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export const createEquipment = async (req, res) => {
  try {
    const { title, description, category_id, photo, price, caution } = req.body;
    const [data] = await Equipment.create({
      title,
      description,
      category_id,
      photo,
      price,
      caution,
      owner_id: owner_id,
    });
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
};
