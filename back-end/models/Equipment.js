import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Equipment = sequelize.define(
  "equipment",
  {
    equipment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "Le titre est obligatoire",
      },
      notEmpty: {
        msg: "Le titre ne peut pas être vide",
      },
      len: {
        args: [3, 60],
        msg: "Le titre doit contenir entre 3 et 60 caractères",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      notNull: {
        msg: "La description est obligatoire",
      },
      notEmpty: {
        msg: "La description ne peut pas être vide",
      },
      len: {
        args: [3],
        msg: "Le description doit contenir au moins 3 caractères",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "category_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "images/default.png",
    },
    price: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: { msg: "Le prix est obligatoire" },
        isDecimal: { msg: "Le prix doit être un nombre décimal" },
        min: {
          args: 1,
          msg: "Le prix ne peut pas être égal à zéro ou négatif",
        },
        max: 99999,
        isInt: true,
      },
    },
    caution: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: { msg: "La caution est obligatoire" },
        isDecimal: { msg: "La caution doit être un nombre décimal" },
        min: {
          args: 1,
          msg: "La caution ne peut pas être négative",
        },
        max: 99999,
        isInt: true,
      },
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    rating_avg: {
      type: DataTypes.DECIMAL(2, 1),
      validate: {
        min: 1,
        max: 5,
      },
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Equipment;
