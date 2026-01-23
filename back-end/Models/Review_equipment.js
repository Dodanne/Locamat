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
      onDelete: "RESTRICT",
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
export default Review_equipment;
