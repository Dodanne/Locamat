import express from "express";
import {
  getRentalsByRenter,
  getRentalsByOwner,
  createRental,
  getRentalByEquipmentId,
  patchRentalStatus,
} from "../controllers/rental.controller.js";
import { authenticateToken } from "../middleware/authentificateToken.js";

const router = express.Router();

router.get("/rental/:id", getRentalByEquipmentId);
router.get("/rental/renter/:id", getRentalsByRenter);
router.get("/rental/owner/:id", getRentalsByOwner);
router.post("/rental/new-rental", authenticateToken, createRental);
router.patch(
  "/rental/status/:id",
  // authenticateToken,
  patchRentalStatus,
);

export default router;
