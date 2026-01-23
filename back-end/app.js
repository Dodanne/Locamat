import express from "express";
import cors from "cors";
import sequelize from "./db/sequelize.js";
import User from "./Models/User.js";
import Equipment from "./Models/Equipment.js";
import Category from "./Models/Category.js";
import Rental from "./Models/rental.js";
import Reviews_user from "./Models/reviews_user.js";
import Reviews_equipment from "./Models/Reviews_equipment.js";

const app = express();

app.use(express.json());
app.use(cors());

//Relations
//equipment&User
Equipment.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
User.hasMany(Equipment, { foreignKey: "owner_id", as: "equipments" });

//equipment&Category
Equipment.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(Equipment, { foreignKey: "category_id", as: "equipments" });

//rental&equipment
Rental.belongsTo(Equipment, { foreignKey: "equipment_id", as: "equipment" });
Equipment.hasMany(Rental, { foreignKey: "equipment_id", as: "rentals" });

//rental&user
Rental.belongsTo(User, { foreignKey: "renter_id", as: "renter" });
User.hasMany(Rental, { foreignKey: "renter_id", as: "rentals" });

//rental&reviews_equipment
Reviews_equipment.belongsTo(Rental, { foreignKey: "rental_id", as: "rental" });
Rental.hasMany(Reviews_equipment, {
  foreignKey: "rental_id",
  as: "reviews_equipment",
});

//rental&reviews_user
Reviews_user.belongsTo(Rental, { foreignKey: "rental_id", as: "rental" });
Rental.hasMany(Reviews_user, {
  foreignKey: "rental_id",
  as: "reviews_user",
});

async function TableSync() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Table et Model synchronisés");
  } catch (err) {
    console.log(err);
  }
}
TableSync();

async function sequelizeAuthentification() {
  try {
    await sequelize.authenticate();
    console.log("succès de la connection");
  } catch (err) {
    console.log(err);
  }
}

sequelizeAuthentification();
