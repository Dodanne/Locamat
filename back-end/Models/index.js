import User from "./User";

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
