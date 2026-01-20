import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";

const Equipment = sequelize.define(
  "equipment",
  {
    equipment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "category_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue:
        "https://us.123rf.com/450wm/dustin999/dustin9992302/dustin999230203648/199476687-ic%C3%B4ne-d-image-dans-un-style-plat-tendance-isol%C3%A9-sur-fond-gris-symbole-d-image-pour-la-conception-de.jpg?ver=6",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    caution: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    timestamps: true,
  },
);
export default Equipment;
