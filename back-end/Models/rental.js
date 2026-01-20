import { DataTypes } from "sequelize";
import Sequelize from "../db/sequelize";

export default function Rental() {
  return Sequelize.define("rental", {
    rental_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  });
}
