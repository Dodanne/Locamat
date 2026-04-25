import { Op } from "sequelize";
import { Rental, User, Equipment } from "../models/index.js";
import sendEmail from "../services/email.service.js";
import { sendNotification } from "../services/socket.service.js";
import { getIo } from "../config/io.js";

export const getRentalsByRenter = async (req, res) => {
  try {
    const renterId = req.params.id;
    await Rental.update(
      { status: "completed" },
      { where: { status: "confirmed", end_date: { [Op.lt]: new Date() } } },
    );
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
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getRentalByEquipmentId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Rental.findAll({
      where: {
        equipment_id: id,
        status: ["pending", "accepted", "confirmed"],
      },
      attributes: ["rental_id", "start_date", "end_date", "status"],
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getRentalsByOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;
    await Rental.update(
      { status: "completed" },
      { where: { status: "confirmed", end_date: { [Op.lt]: new Date() } } },
    );
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
    res.status(500).json({ error: "Erreur serveur" });
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
    // const ownerEmail = equipment.owner.email;
    // await sendEmail(
    //   ownerEmail,
    //   "Vous avez une nouvelle demande de réservation",
    //   `<h1> Félicitations </h1>
    //      <p>Vous avez une nouvelle demande de réservation sur le site LocaMat. Répondez rapidement pour ne pas rater la location!</p>
    //   <a href="${process.env.FRONT_URL}/connexion"> Connectez-vous ici.</a>
    //   <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    // `,
    // );
    sendNotification(getIo(), equipment.owner_id, {
      type: "nouvelle_demande",
      message: `Vous avez reçu une nouvelle demande de location pour le materiel suivant : ${equipment.title}`,
      data: { rental_id: data.rental_id, equipment_id },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
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
          as: "owner",
          attributes: ["email", "first_name"],
        },
      ],
    });
    const data = await Rental.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Location non trouvée" });
    }
    data.status = status;
    await data.save();

    // const renterEmail = equipment.renter.email;
    //     if (status === "accepted") {
    //       await sendEmail(
    //         renterEmail,
    //         "Votre demande de réservation a été accepté ",
    //         `<h1> Félicitations </h1>
    //       <p>Votre demande de réservation a été accepté sur le site LocaMat. Vous pouvez dès à présent procéder au paiement afin de valider la réservation.</p>
    //       <p>Veuillez noter que vous pouvez annuler gratuitement 24h avant le début de la réservation.</p>
    //       <a href="${process.env.FRONT_URL}/connexion"> Connectez-vous ici.</a>
    //       <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    //     `,
    //       );
    //     }
    //     if (status === "refused") {
    //       await sendEmail(
    //         renterEmail,
    //         "Votre demande de réservation a été refusé ",
    //         `<h1>Demande de réservation refusée</h1>
    // <p>Votre demande de réservation sur LocaMat a été refusée par le propriétaire du matériel.</p>
    // <p>Vous pouvez consulter vos autres réservations ou tenter une nouvelle réservation.</p>
    // <a href="${process.env.FRONT_URL}/connexion">Connectez-vous ici pour voir vos réservations.</a>
    // <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.</p>
    //     `,
    //       );
    //     }
    let notificationForRenter;
    let notificationForOwner;
    switch (data.status) {
      case "accepted":
        notificationForRenter = {
          type: "demande_acceptee",
          message: `Votre demande de location pour "${equipment.title}" a ete acceptee par le proprietaire, passez au paiement de la reservation dès maintenant!`,
          data: { rental_id: id, equipment_id },
        };
        break;
      case "refused":
        notificationForRenter = {
          type: "demande_refusee",
          message: `Votre demande de location pour "${equipment.title}" a ete refusee par le proprietaire`,
          data: { rental_id: id, equipment_id },
        };
        break;
      case "confirmed":
        notificationForOwner = {
          type: "location_payee_par_locataire",
          message: `La location pour "${equipment.title}" a été payee par le locataire. La location est maintenant confirmee, n'oubliez pas de vous donner un point de rendez-vous!`,
          data: { rental_id: id, equipment_id },
        };
        break;
      case "cancelled_by_owner":
        notificationForRenter = {
          type: "demande_annulee_par_proprietaire",
          message: `Votre demande de location pour "${equipment.title}" a ete annulee par le proprietaire`,
          data: { rental_id: id, equipment_id },
        };
        break;
      case "cancelled_by_renter":
        notificationForOwner = {
          type: "demande_annulee_par_locataire",
          message: `La demande de location pour "${equipment.title}" a ete annulee par le locataire`,
          data: { rental_id: id, equipment_id },
        };
        break;
      case "completed":
        notificationForRenter = {
          type: "demande_confirmee_par_proprietaire",
          message: `Votre demande de location pour "${equipment.title}" est maintenant terminee. Laissez un avis sur votre loueur!`,
          data: { rental_id: id, equipment_id },
        };
        notificationForOwner = {
          type: "demande_confirmee_par_locataire",
          message: `Votre demande de location pour "${equipment.title}" est maintenant terminee. Laissez un avis sur votre locataire!`,
          data: { rental_id: id, equipment_id },
        };
        break;
      default:
        notificationForRenter = null;
    }
    if (notificationForOwner) {
      sendNotification(getIo(), equipment.owner_id, notificationForOwner);
    }
    if (notificationForRenter) {
      sendNotification(getIo(), data.renter_id, notificationForRenter);
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
