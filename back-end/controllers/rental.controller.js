import { Rental, User, Equipment } from "../Models/index.js";

export const getAllRentals = async (req, res) => {
  try {
    const data = await Rental.findAll({
      include: [
        {
          model: User,
          as: "renter",
          attributes: ["user_id", "first_name", "last_name", "email", "photo"],
        },
        {
          model: Equipment,
          as: "equipment",
          attributes: ["equipment_id", "title", "price", "photo"],
        },
      ],
    });
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getRentalsByRenter = async (req, res) => {
  try {
    const renterId = req.params.id;
    const data = await Rental.findAll({
      where: { renter_id: renterId },
      include: [
        {
          model: Equipment,
          as: "equipment",
          attributes: ["equipment_id", "title", "price", "photo", "owner_id"],
          include: [
            {
              model: User,
              as: "owner",
              attributes: ["user_id", "first_name", "last_name", "photo"],
            },
          ],
        },
        {
          model: User,
          as: "renter",
          attributes: ["user_id", "first_name", "last_name", "photo", "email"],
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({ error: "Erreur serveur" });
  }
};
