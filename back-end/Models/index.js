import sequelize from "../db/sequelize.js";
import User from "./User.js";
import Category from "./Category.js";
import Equipment from "../models/Equipment.js";
import Rental from "./Rental.js";
import Reviews_equipment from "./Review_equipment.js";
import Reviews_user from "./Review_user.js";

//Relations
//equipment&User
User.hasMany(Equipment, { foreignKey: "owner_id", as: "equipments" });
Equipment.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

//equipment&Category
Category.hasMany(Equipment, { foreignKey: "category_id", as: "equipments" });
Equipment.belongsTo(Category, { foreignKey: "category_id", as: "category" });

//rental&equipment
Equipment.hasMany(Rental, { foreignKey: "equipment_id", as: "rentals" });
Rental.belongsTo(Equipment, { foreignKey: "equipment_id", as: "equipment" });

//rental&user
User.hasMany(Rental, { foreignKey: "renter_id", as: "rentals" });
Rental.belongsTo(User, { foreignKey: "renter_id", as: "renter" });

//rental&reviews_equipment
Rental.hasMany(Reviews_equipment, {
  foreignKey: "rental_id",
  as: "reviews_equipment",
});
Reviews_equipment.belongsTo(Rental, { foreignKey: "rental_id", as: "rental" });

//rental&reviews_user
Rental.hasMany(Reviews_user, {
  foreignKey: "rental_id",
  as: "reviews_user",
});
Reviews_user.belongsTo(Rental, { foreignKey: "rental_id", as: "rental" });

export {
  sequelize,
  User,
  Category,
  Equipment,
  Rental,
  Reviews_equipment,
  Reviews_user,
};
