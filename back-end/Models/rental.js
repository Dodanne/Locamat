import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Rental = sequelize.define(
  "rental",
  {
    rental_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "equipment",
        key: "equipment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Rental;
