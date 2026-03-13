import sequelize from "../db/sequelize.js";
import User from "./User.js";
import Category from "./Category.js";
import Equipment from "./Equipment.js";
import Rental from "./Rental.js";
import Reviews_equipment from "./Review_equipment.js";
import Reviews_user from "./Review_user.js";
import Message from "./Message.js";
import Conversation from "./Conversation.js";

//Relations
//equipment&User
User.hasMany(Equipment, {
  foreignKey: { name: "owner_id", allowNull: false },
  as: "equipments",
});
Equipment.belongsTo(User, {
  foreignKey: { name: "owner_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "owner",
});

//equipment&Category
Category.hasMany(Equipment, {
  foreignKey: { name: "category_id", allowNull: false },
  as: "equipments",
});
Equipment.belongsTo(Category, {
  foreignKey: {
    name: "category_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
  as: "category",
});

//rental&equipment
Equipment.hasMany(Rental, {
  foreignKey: { name: "equipment_id", allowNull: true },
  as: "rentals",
});
Rental.belongsTo(Equipment, {
  foreignKey: { name: "equipment_id", allowNull: true },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "equipment",
});

//rental&user
User.hasMany(Rental, {
  foreignKey: { name: "renter_id", allowNull: false },
  as: "rentals",
});
Rental.belongsTo(User, {
  foreignKey: { name: "renter_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "renter",
});

//rental&reviews_equipment
Rental.hasMany(Reviews_equipment, {
  foreignKey: { name: "rental_id", allowNull: true },
  as: "reviews_equipment",
});
Reviews_equipment.belongsTo(Rental, {
  foreignKey: { name: "rental_id", allowNull: true },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "rental",
});

//rental&reviews_user
Rental.hasMany(Reviews_user, {
  foreignKey: { name: "rental_id", allowNull: false },
  as: "reviews_user",
});
Reviews_user.belongsTo(Rental, {
  foreignKey: { name: "rental_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "rental",
});

//review_user&user (who give )
User.hasMany(Reviews_user, {
  foreignKey: { name: "reviewer_id", allowNull: true },
  as: "giveUserReview",
});
Reviews_user.belongsTo(User, {
  foreignKey: { name: "reviewer_id", allowNull: true },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "reviewer",
});

//review_user&user (who receive )
User.hasMany(Reviews_user, {
  foreignKey: {
    name: "reviewed_user_id",
    allowNull: true,
  },
  as: "receiveUserReview",
});

Reviews_user.belongsTo(User, {
  foreignKey: {
    name: "reviewed_user_id",
    allowNull: true,
  },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "reviewedUser",
});

//review_equipment&user (who gives)
User.hasMany(Reviews_equipment, {
  foreignKey: {
    name: "reviewer_id",
    allowNull: true,
  },
  as: "giveEquipmentReview",
});
Reviews_equipment.belongsTo(User, {
  foreignKey: { name: "reviewer_id", allowNull: true },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "reviewer",
});

//review_equipment&user (who receive )
User.hasMany(Reviews_equipment, {
  foreignKey: {
    name: "reviewed_user_id",
    allowNull: true,
  },
  as: "recieveEquipmentReview",
});
Reviews_equipment.belongsTo(User, {
  foreignKey: {
    name: "reviewed_user_id",
    allowNull: true,
  },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "reviewedEquipmentUser",
});

//message&conversation
Conversation.hasMany(Message, {
  foreignKey: { name: "conversation_id", allowNull: false },
  as: "messages",
});
Message.belongsTo(Conversation, {
  foreignKey: { name: "conversation_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "conversation",
});

// Message&User
User.hasMany(Message, {
  foreignKey: { name: "sender_id", allowNull: true },
  as: "sentMessages",
});
Message.belongsTo(User, {
  foreignKey: { name: "sender_id", allowNull: true },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "sender",
});

// conversation&user1
User.hasMany(Conversation, {
  foreignKey: { name: "user1_id", allowNull: false },
  as: "conversationsAsUser1",
});
Conversation.belongsTo(User, {
  foreignKey: { name: "user1_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user1",
});

// conversation&user2
User.hasMany(Conversation, {
  foreignKey: { name: "user2_id", allowNull: false },
  as: "conversationsAsUser2",
});
Conversation.belongsTo(User, {
  foreignKey: { name: "user2_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user2",
});

//equipment&Conversation
Equipment.hasMany(Conversation, {
  foreignKey: { name: "equipment_id", allowNull: true },
  as: "conversations",
});
Conversation.belongsTo(Equipment, {
  foreignKey: { name: "equipment_id", allowNull: true },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  as: "equipment",
});

export {
  sequelize,
  User,
  Category,
  Equipment,
  Rental,
  Reviews_equipment,
  Reviews_user,
  Conversation,
  Message,
};
