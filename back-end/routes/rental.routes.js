import express from "express";
import {
  getAllRentals,
  getRentalById,
} from "../controllers/rental.controller.js";

const router = express.Router();

router.get("/rent", getAllRentals);
router.get("/rental/:id", getRentalById);

export default router;
