import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import User from "./User.js";

const Review_user = sequelize.define(
  "review_user",
  {
    reviews_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rental_id: {
      type: DataTypes.INTEGER,
    },
    reviewer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reviewed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "La note est obligatoire" },
        min: {
          args: [1],
          msg: "La note minimale est 1",
        },
        max: {
          args: [5],
          msg: "La note maximale est 5",
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { mesage: "Le commentaire est obligatoire" },
        notEmpty: { mesage: "Le commentaire ne peut pas être vide" },
        len: {
          args: [3, 1000],
          mesage: "Le commentaire doit contenir entre 3 et 1000 caractères",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("renter", "owner"),
      allowNull: false,
      indexes: [
        {
          unique: true,
          fields: ["rental_id", "reviewer_id"],
        },
      ],
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);

Review_user.afterCreate(async (review) => {
  const reviews = await Review_user.findAll({
    where: { reviewed_user_id: review.reviewed_user_id },
  });
  const rating_count = reviews.length;
  const rating_avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / rating_count;
  console.log("count", rating_count);
  console.log("avg", rating_avg);
  await User.update(
    { rating_count, rating_avg },
    { where: { user_id: review.reviewed_user_id } },
  );
});

export default Review_user;
