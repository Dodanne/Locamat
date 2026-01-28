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
      onDelete: "SET NULL",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "La date de début est obligatoire" },
        isDate: { msg: "La date de début doit être une date valide" },
      },
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "La date de fin est obligatoire" },
        isDate: { msg: "La date de fin doit être une date valide" },
        isAfterStart(value) {
          if (this.start_date && value < this.start_date) {
            throw new Error("La date de fin doit être après la date de début");
          }
        },
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "refused"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Rental;
