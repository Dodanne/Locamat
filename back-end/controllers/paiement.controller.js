import { stripe } from "../services/stripe.service.js";
import { patchRentalStatus } from "./rental.controller.js";

export const postPaiementSession = async (req, res) => {
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
  const signature = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

  let event;
  try {
    if (!signature || !endpointSecret) {
      throw new Error("Secret manquant ou faux");
    }
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    console.log(err);
  }

  if (event.type === "checkout.session.completed") {
    console.log("session completed");

    const session = event.data.object;
    const rental_id = session.metadata?.rental_id;
    if (rental_id) {
      const rental = await Rental.findByPk(rental_id);
      rental.status = "confirmed";
      await rental.save();
    }
    console.log(rental_id);
  }
  res.json({ received: true });
};
