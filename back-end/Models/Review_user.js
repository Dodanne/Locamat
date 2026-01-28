import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Review_user = sequelize.define(
  "review_user",
  {
    reviews_user_id: {
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
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Review_user;
