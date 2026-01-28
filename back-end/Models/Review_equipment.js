import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Review_equipment = sequelize.define(
  "review_equipment",
  {
    reviews_equipment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rental_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "rental",
        key: "rental_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        notNull: { msg: "La note est obligatoire" },
        min: {
          args: [1],
          msg: "La note minimale est 1",
        },
        max: {
          args: [5],
          msg: "La note maximale est 5",
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { mesage: "Le commentaire est obligatoire" },
        notEmpty: { mesage: "Le commentaire ne peut pas être vide" },
        len: {
          args: [3, 1000],
          mesage: "Le commentaire doit contenir entre 3 et 1000 caractères",
        },
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Review_equipment;
