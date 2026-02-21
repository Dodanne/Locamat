import { Rental, User, Equipment, Category } from "../models/index.js";
import sendEmail from "../services/email.service.js";

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
          attributes: [
            "equipment_id",
            "title",
            "price",
            "photo",
            "owner_id",
            "description",
            "caution",
          ],
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
      order: [["createdAt", "DESC"]],
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ error: "Erreur serveur" });
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
          attributes: [
            "equipment_id",
            "title",
            "price",
            "photo",
            "description",
            "owner_id",
            "caution",
          ],
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
                "rating_avg",
                "rating_count",
                "user_type",
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
    console.log(err);
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
    console.log(err);
    res.json({ error: "Erreur serveur" });
  }
};
export const createRental = async (req, res) => {
  try {
    const { start_date, end_date, equipment_id, total_price } = req.body;
    const renter_id = req.user.id;
    console.log("total price " + req.body.total_price);
    const equipment = await Equipment.findByPk(equipment_id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["email", "first_name"],
        },
      ],
    });
    const data = await Rental.create({
      start_date,
      end_date,
      total_price,
      status: "pending",
      equipment_id,
      renter_id: renter_id,
    });
    const ownerEmail = equipment.owner.email;
    await sendEmail(
      ownerEmail,
      "Vous avez une nouvelle demande de reservation",
      `<h1> Felicitations 🎊</h1>
         <p>Vous avez une nouvelle demande de reservation sur le site LocaMat. Repondez rapidement pour ne pas rater la location!</p>
      <a href="${process.env.FRONT_URL}/connexion"> Connectez-vous ici.</a>
      <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    `,
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export const patchRentalStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const data = await Rental.findByPk(id);
    data.status = status;
    await data.save();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
