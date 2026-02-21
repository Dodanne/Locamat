import { Equipment, User, Category } from "../models/index.js";
import { Op } from "sequelize";

export const getAllEquipments = async (req, res) => {
  try {
    const data = await Equipment.findAll({
      include: [
        {
          model: User,
          as: "owner",
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "city",
            "rating_avg",
            "rating_count",
            "user_type",
          ],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};
export const get6FirstEquipment = async (req, res) => {
  try {
    const data = await Equipment.findAll({
      include: [
        {
          model: User,
          as: "owner",
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "city",
            "rating_avg",
            "rating_count",
            "user_type",
          ],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
      limit: 6,
      order: [["createdAt", "DESC"]],
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Equipment.findByPk(id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "city",
            "rating_avg",
            "rating_count",
            "user_type",
          ],
        },
        {
          model: Category,
          as: "category",
          //attribute
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export const getEquipmentByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Equipment.findAll({
      where: { owner_id: id },
      include: [
        {
          model: User,
          as: "owner",
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "city",
            "rating_avg",
            "rating_count",
            "user_type",
          ],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
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
export const getFiltredEquipments = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  if (!q) {
    return res.json([]);
  }

  try {
    const equipments = await Equipment.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
        ],
      },
      limit: 6,
    });

    res.json(equipments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const getFiltredSearch = async (req, res) => {
  const { q, limit } = req.query;

  if (!q || q.length < 2) {
    return res.json([]);
  }

  const options = {
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } },
      ],
    },
  };

  if (limit) {
    options.limit = Number(limit);
  }

  const equipments = await Equipment.findAll(options);
  res.json(equipments);
};
export const deleteEquipment = async (req, res) => {
  try {
    console.log("ok");
    const { id } = req.params;
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({
        message: "Motif de suppression obligatoire",
      });
    }
    const deletedEquipment = await Equipment.destroy({
      where: { equipment_id: Number(id) },
    });
    return res.status(200).json({
      message: "Équipement supprimé avec succès",
      equipment: deletedEquipment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Erreur lors de la suppression de l'équipement",
    });
  }
};
export const updateEquipment = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, description, category } = req.body;
    const data = await Equipment.findByPk(id);
    data.title = title;
    data.price = price;
    data.description = description;
    data.categoryId = category;

    if (req.file) {
      data.photo = req.file.filename;
    }
    await data.save(); //updatedAt
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
