import { Rental, User, Equipment, Category } from "../models/index.js";
import sendEmail from "../services/email.service.js";

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
export const getRentalByEquipmentId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Rental.findAll(id, {
      include: [
        {
          model: Equipment,
          as: "equipment",
          attributes: ["equipment_id"],
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
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "photo",
            "email",
            "city",
          ],
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
    const equipment = await Equipment.findByPk(equipment_id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["email", "first_name"],
        },
      ],
    });
    if (equipment.owner_id === renter_id) {
      return res.json({
        message: "Impossible de reserver son propre equipement",
      });
    }
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
      "Vous avez une nouvelle demande de réservation",
      `<h1> Félicitations </h1>
         <p>Vous avez une nouvelle demande de réservation sur le site LocaMat. Répondez rapidement pour ne pas rater la location!</p>
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
    const { status, equipment_id } = req.body;
    const equipment = await Equipment.findByPk(equipment_id, {
      include: [
        {
          model: User,
          as: "renter",
          attributes: ["email", "first_name"],
        },
      ],
    });
    const data = await Rental.findByPk(id);
    data.status = status;
    await data.save();
    const renterEmail = equipment.renter.email;
    if (status === "accepted") {
      await sendEmail(
        renterEmail,
        "Votre demande de réservation a été accepté ",
        `<h1> Félicitations </h1>
      <p>Votre demande de réservation a été accepté sur le site LocaMat. Vous pouvez dès à présent procéder au paiement afin de valider la réservation.</p>
      <p>Veuillez noter que vous pouvez annuler gratuitement 24h avant le début de la réservation.</p>
      <a href="${process.env.FRONT_URL}/connexion"> Connectez-vous ici.</a>
      <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    `,
      );
    }
    if (status === "refused") {
      await sendEmail(
        renterEmail,
        "Votre demande de réservation a été refusé ",
        `<h1>Demande de réservation refusée</h1>
<p>Votre demande de réservation sur LocaMat a été refusée par le propriétaire du matériel.</p>
<p>Vous pouvez consulter vos autres réservations ou tenter une nouvelle réservation.</p>
<a href="${process.env.FRONT_URL}/connexion">Connectez-vous ici pour voir vos réservations.</a>
<p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    `,
      );
    }
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
