import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Conversation = sequelize.define(
  "conversation",
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    renter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    equipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
export default Conversation;
