import { Category } from "../models/index.js";

export const getAllCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    if (data.length === 0) {
      return res.status(404).json({ message: "Aucune catégorie trouvée" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
