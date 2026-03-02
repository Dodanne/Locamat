import Rental from "./../models/Rental.js";
import Equipment from "./../models/Equipment.js";
import User from "./../models/User.js";
import Review_equipment from "../models/Review_equipment.js";
import Review_user from "../models/Review_user.js";
import { Op } from "sequelize";

export const createUserReview = async (req, res) => {
  try {
    const { rental_id, rating, comment, status } = req.body;
    const reviewer_id = req.user.id;
    const rental = await Rental.findByPk(rental_id, {
      include: [
        {
          model: Equipment,
          as: "equipment",
          include: [{ model: User, as: "owner" }],
        },
        { model: User, as: "renter" },
      ],
    });
    const reviewed_user_id =
      status === "renter"
        ? rental.equipment.owner.user_id
        : rental.renter.user_id;

    const data = await Review_user.create({
      rental_id,
      rating,
      comment,
      status,
      reviewer_id,
      reviewed_user_id,
    });
    res.json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
export const createEquipmentReview = async (req, res) => {
  try {
    const { rental_id, rating, comment } = req.body;

    const reviewer_id = req.user.id;
    const rental = await Rental.findByPk(rental_id, {
      include: [
        {
          model: Equipment,
          as: "equipment",
          include: [{ model: User, as: "owner" }],
        },
        { model: User, as: "renter" },
      ],
    });
    const reviewed_user_id = rental.equipment.owner.user_id;
    const data = await Review_equipment.create({
      rental_id,
      rating,
      comment,
      reviewer_id,
      reviewed_user_id,
    });
    res.json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
export const getEquipmentIsReview = async (req, res) => {
  try {
    const rental_id = req.params.rental_id;
    const data = await Review_equipment.findAll({ where: { rental_id } });
    const hasReview = data.length > 0;
    res.json({ hasReview });
  } catch (err) {
    console.log(err);
  }
};
export const getUserIsReview = async (req, res) => {
  try {
    const rental_id = req.params.rental_id;
    const data = await Review_user.findAll({ where: { rental_id } });
    const hasReview = data.length > 0;
    res.json({ hasReview });
  } catch (err) {
    console.log(err);
  }
};
export const getUserReviews = async (req, res) => {
  try {
    const reviewed_user_id = req.params.user_id;

    const data = await Review_user.findAll({
      where: { reviewed_user_id },
      include: [
        {
          model: Rental,
          as: "rental",
          include: [
            {
              model: Equipment,
              as: "equipment",
            },
          ],
        },
        {
          model: User,
          as: "reviewer",
          attributes: ["user_id", "first_name", "last_name", "photo", "city"],
        },
      ],
    });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export const getEquipmentReviews = async (req, res) => {
  try {
    const equipment_id = req.params.equipment_id;
    const data = await Review_equipment.findAll({
      include: [
        {
          model: Rental,
          as: "rental",
          where: { equipment_id },
          attributes: [],
        },
        {
          model: User,
          as: "reviewer",
          attributes: ["user_id", "first_name", "last_name", "photo", "city"],
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
