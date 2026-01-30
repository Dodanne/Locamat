import express from "express";
import {
  getAllRentals,
  getRentalsByRenter,
} from "../controllers/rental.controller.js";

const router = express.Router();

router.get("/rent", getAllRentals);
router.get("/rental/:id", getRentalsByRenter);

export default router;
