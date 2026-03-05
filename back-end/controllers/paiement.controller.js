import { stripe } from "../services/stripe.service.js";
import Rental from "../models/Rental.js";

export const postPaiementSession = async (req, res) => {
  console.log("creation paiement");
  try {
    const { rental_id } = req.body;
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
            unit_amount: 2000, // 20 €
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONT_URL}/paiement-success`,
      cancel_url: `${process.env.FRONT_URL}/paiement-cancel`,
      metadata: { rental_id: rental_id.toString() },
    });
    res.json({ url: data.url });
  } catch (err) {
    console.log(err);
  }
};

export const postWebHook = async (req, res) => {
  console.log("webhook actif");
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
  }
};
