import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Le nom de la catégorie est obligatoire",
        },
        notEmpty: {
          message: "Le nom de la catégorie ne peut pas être vide",
        },
        len: {
          args: [2, 50],
          message:
            "Le nom de la catégorie doit contenir entre 2 et 50 caractères",
        },
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "L'icone de la catégorie est obligatoire",
        },
        notEmpty: {
          message: "L'icone de la catégorie ne peut pas être vide",
        },
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);
export default Category;
