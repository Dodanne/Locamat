import { Equipment, User, Category } from "../models/index.js";
import { Op } from "sequelize";

export const getAllEquipments = async (req, res) => {
  try {
    const limit = 10;
    const offset = 0;
    const data = await Equipment.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
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
    console.log(err);
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
    console.log(err);
  }
};

export const getEquipmentByUser = async (req, res) => {
  try {
    const limit = 10;
    const offset = 0;
    const id = req.params.id;
    const data = await Equipment.findAll({
      limit,
      offset,
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
    console.log(err);
  }
};

export const createEquipment = async (req, res) => {
  try {
    const { title, description, category_id, price, caution } = req.body;
    const photo = req.file ? req.file.path : "default.png";
    console.log("Fichier uploadé :", req.file);
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
  }
};

export const getSearchEquipments = async (req, res) => {
  try {
    const limit = 10;
    const offset = 0;
    const { q, categories, maxPrice } = req.query;
    const where = {};
    if (q && q.length >= 2) {
      where[Op.or] = [{ title: { [Op.like]: `%${q}%` } }];
    }
    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories.map(Number)
        : categories.split(",").map(Number);

      where.category_id = { [Op.in]: categoryArray };
    }

    if (maxPrice) {
      where.price = { [Op.lte]: Number(maxPrice) };
    }

    const equipments = await Equipment.findAll({
      limit,
      offset,
      where,
      include: [
        { model: Category, as: "category" },
        {
          model: User,
          as: "owner",
          attributes: ["user_id", "city", "rating_avg", "rating_count"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(equipments);
  } catch (err) {
    console.log(err);
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
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
    const { title, price, description } = req.body;
    console.log("req.body →", req.body);
    console.log("req.file →", req.file);
    const data = await Equipment.findByPk(id);
    data.title = title;
    data.price = Number(price);
    data.description = description;

    if (req.file) {
      data.photo = req.file.path;
    }
    await data.save(); //updatedAt
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
