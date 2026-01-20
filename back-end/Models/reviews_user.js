import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";

const Reviews_user = sequelize.define(
  "reviews_users",
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
export default Reviews_user;
