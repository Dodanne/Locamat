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
      allowNull: false,
    },

    renter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "refused",
        "completed",
        "cancelled_by_owner",
        "cancelled_by_renter",
        "confirmed",
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    payment_intent_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.ENUM("unpaid", "paid", "refunded"),
      defaultValue: "unpaid",
    },
    refunded_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Rental;
