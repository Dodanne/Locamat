import { Rental, User, Equipment } from "../Models/index.js";

export const getAllRentals = async (req, res) => {
  try {
    const data = await Rental.findAll({
      include: [
        {
          model: User,
          as: "renter",
          attributes: ["id", "first_name", "last_name", "email", "photo"],
        },
        {
          model: Equipment,
          as: "equipment",
          attributes: ["id", "name", "type", "status"],
        },
      ],
    });
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getRentalById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Rental.findByPk(id, {
      include: [
        {
          model: Equipment,
          as: "equipment",
          //attribute
        },
        {
          model: User,
          as: "renter",
          //attribute
        },
      ],
    });
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};
