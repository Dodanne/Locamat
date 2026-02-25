import {
  postPaiementSession,
  postWebHook,
} from "../controllers/paiement.controller.js";
import express from "express";

const router = express.Router();

router.post("/create-paiement-session", postPaiementSession);

export default router;
