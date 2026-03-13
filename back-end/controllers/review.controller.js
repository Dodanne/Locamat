import Rental from "./../models/Rental.js";
import Equipment from "./../models/Equipment.js";
import User from "./../models/User.js";
import Review_equipment from "../models/Review_equipment.js";
import Review_user from "../models/Review_user.js";

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
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getEquipmentIsReview = async (req, res) => {
  try {
    const rental_id = req.params.rental_id;
    const reviewer_id = req.user.id;
    const data = await Review_equipment.findOne({
      where: { rental_id, reviewer_id },
    });
    const hasReview = data ? true : false;
    res.json({ hasReview });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getUserIsReview = async (req, res) => {
  try {
    const rental_id = req.params.rental_id;
    const reviewer_id = req.user.id;
    const data = await Review_user.findOne({
      where: { rental_id, reviewer_id },
    });
    const hasReview = data ? true : false;
    res.json({ hasReview });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
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

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Erreur serveur" });
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
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getUserGivesReviews = async (req, res) => {
  try {
    const reviewer_id = req.params.user_id;

    const dataUser = await Review_user.findAll({
      where: { reviewer_id },
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
          as: "reviewed",
          attributes: ["user_id", "first_name", "last_name", "photo", "city"],
        },
      ],
    });
    const dataEquipment = await Review_equipment.findAll({
      where: { reviewer_id },
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
          as: "reviewedUser",
          attributes: ["user_id", "first_name", "last_name", "photo", "city"],
        },
      ],
    });

    res.json({
      userReviews: dataUser,
      equipmentReviews: dataEquipment,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Erreur serveur" });
  }
};
