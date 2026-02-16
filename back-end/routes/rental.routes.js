import express from "express";
import {
  getAllRentals,
  getRentalsByRenter,
  getRentalsByOwner,
  createRental,
} from "../controllers/rental.controller.js";
import { authenticateToken } from "../middleware/authentificateToken.js";

const router = express.Router();

router.get("/rent", getAllRentals);
router.get("/rental/renter/:id", getRentalsByRenter);
router.get("/rental/owner/:id", getRentalsByOwner);
router.post("/rental/new-rental", authenticateToken, createRental);

export default router;
