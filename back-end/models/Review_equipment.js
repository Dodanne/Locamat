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
      allowNull: true,
    },
    reviewer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reviewed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

async function equipmentRating(equipment_id) {
  const rating_count = await Review_equipment.count({
    where: { reviewed_equipment_id: equipment_id },
  });

  const rating_sum = await Review_equipment.sum("rating", {
    where: { reviewed_equipment_id: equipment_id },
  });

  const rating_avg = rating_count === 0 ? 0 : rating_sum / rating_count;

  await Equipment.update(
    { rating_count, rating_avg },
    { where: { equipment_id: equipment_id } },
  );
}
Review_equipment.afterCreate(async (review) => {
  await equipmentRating(review.reviewed_equipment_id);
});
Review_equipment.afterUpdate(async (review) => {
  await equipmentRating(review.reviewedequipmentr_id);
});
Review_equipment.afterDestroy(async (review) => {
  await equipmentRating(review.reviewed_equipment_id);
});
export default Review_equipment;
