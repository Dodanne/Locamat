import { stripe } from "../services/stripe.service.js";
import Rental from "../models/Rental.js";
import Equipment from "../models/Equipment.js";
import { sendNotification } from "../services/socket.service.js";
import { getIo } from "../config/io.js";

export const postPaiementSession = async (req, res) => {
  try {
    const { rental_id, equipment_id } = req.body;
    const rental = await Rental.findByPk(rental_id);
    if (!rental) {
      return res.status(404).json({ message: "Location non trouvee" });
    }
    const data = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Location test",
            },
            unit_amount: rental.total_price * 100, //mettre en centimes
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/paiement-success/${equipment_id}/${rental_id}`,
      cancel_url: `${process.env.CLIENT_URL}/paiement-cancel/${equipment_id}/${rental_id}`,
      metadata: { rental_id: rental_id.toString() },
    });
    res.json({ url: data.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const postWebHook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

  let event;
  try {
    if (!signature || !endpointSecret) {
      throw new Error("Secret manquant ou faux");
    }
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const rental_id = session.metadata?.rental_id;
      if (rental_id) {
        const rental = await Rental.findByPk(rental_id);
        if (rental) {
          rental.status = "confirmed";
          rental.payment_status = "paid";
          await rental.save();
        }
      }
    }
    res.json({ received: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const notificationPaiement = async (req, res) => {
  try {
    const { rental_id } = req.body;
    const rental = await Rental.findByPk(rental_id, {
      include: [
        {
          model: Equipment,
          as: "equipment",
          attributes: ["title", "owner_id", "equipment_id"],
        },
      ],
    });
    if (!rental) {
      return res.status(404).json({ message: "Location non trouvee" });
    }
    sendNotification(getIo(), rental.equipment.owner_id, {
      type: "location_payee_par_locataire",
      message: `La location pour "${rental.equipment.title}" a été payee par le locataire. La location est maintenant confirmee, n'oubliez pas de vous donner un point de rendez-vous!`,
      data: { rental_id, equipment_id: rental.equipment.equipment_id },
    });
    res.json({ message: "Notification envoyee" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
