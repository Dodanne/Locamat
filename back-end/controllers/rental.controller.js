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
              attributes: [
                "user_id",
                "first_name",
                "last_name",
                "photo",
                "city",
              ],
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

export const getRentalsByOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const data = await Rental.findAll({
      include: [
        {
          model: Equipment,
          as: "equipment",
          where: { owner_id: ownerId },
          attributes: ["equipment_id", "title", "price", "photo", "owner_id"],
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
export const createRental = async (req, res) => {
  try {
    const { start_date, end_date, equipment_id, total_price } = req.body;
    const renter_id = req.user.id;
    console.log("total price " + req.body.total_price);
    const data = await Rental.create({
      start_date,
      end_date,
      total_price,
      status: "pending",
      equipment_id,
      renter_id: renter_id,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
