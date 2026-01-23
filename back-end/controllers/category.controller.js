import { Category } from "../Models/index.js";

export const getAllCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json(data);
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await Category.findByPk(id);
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
};
