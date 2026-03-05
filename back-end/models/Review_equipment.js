import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import Equipment from "./Equipment.js";
import Rental from "./Rental.js";

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
      onDelete: "CASCADE",
    },
    reviewer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "user_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    reviewed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "user_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    rating: {
      type: DataTypes.INTEGER,
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
        notNull: { msg: "Le commentaire est obligatoire" },
        notEmpty: { msg: "Le commentaire ne peut pas être vide" },
        len: {
          args: [3, 1000],
          msg: "Le commentaire doit contenir entre 3 et 1000 caractères",
        },
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["rental_id", "reviewer_id"],
      },
    ],
  },
);

Review_equipment.afterCreate(async (review) => {
  const reviews = await Review_equipment.findAll({
    where: { reviewed_user_id: review.reviewed_user_id },
  });
  const rental = await Rental.findByPk(review.rental_id);
  const rating_count = reviews.length;
  const rating_avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / rating_count;
  console.log("count", rating_count);
  console.log("avg", rating_avg);
  await Equipment.update(
    { rating_count, rating_avg },
    { where: { equipment_id: rental.equipment_id } },
  );
});
export default Review_equipment;
