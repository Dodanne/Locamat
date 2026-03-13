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
        notNull: { message: "Le commentaire est obligatoire" },
        notEmpty: { message: "Le commentaire ne peut pas être vide" },
        len: {
          args: [3, 1000],
          message: "Le commentaire doit contenir entre 3 et 1000 caractères",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("renter", "owner"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["rental_id", "reviewer_id"],
      },
    ],
  },
);

async function userRating(user_id) {
  const rating_count = await Review_user.count({
    where: { reviewed_user_id: user_id },
  });

  const rating_sum = await Review_user.sum("rating", {
    where: { reviewed_user_id: user_id },
  });

  const rating_avg = rating_count === 0 ? 0 : rating_sum / rating_count;

  await User.update(
    { rating_count, rating_avg },
    { where: { user_id: user_id } },
  );
}
Review_user.afterCreate(async (review) => {
  await userRating(review.reviewed_user_id);
});
Review_user.afterUpdate(async (review) => {
  await userRating(review.reviewed_user_id);
});
Review_user.afterDestroy(async (review) => {
  await userRating(review.reviewed_user_id);
});

export default Review_user;
