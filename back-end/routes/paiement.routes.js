import {
  notificationPaiement,
  postPaiementSession,
  postWebHook,
} from "../controllers/paiement.controller.js";
import express from "express";
import { authenticateToken } from "../middleware/authentificateToken.js";

const router = express.Router();

router.post("/create-paiement-session", postPaiementSession);
router.post("/notification-paiement", authenticateToken, notificationPaiement);

export default router;
