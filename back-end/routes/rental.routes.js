import express from "express";
import {
  getAllRentals,
  getRentalsByRenter,
  getRentalsByOwner,
} from "../controllers/rental.controller.js";

const router = express.Router();

router.get("/rent", getAllRentals);
router.get("/rental/renter/:id", getRentalsByRenter);
router.get("/rental/owner/:id", getRentalsByOwner);

export default router;
