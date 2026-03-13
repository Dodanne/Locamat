import express from "express";
import { authenticateToken } from "../middleware/authentificateToken.js";
import {
  createEquipmentReview,
  createUserReview,
  getEquipmentIsReview,
  getEquipmentReviews,
  getUserGivesReviews,
  getUserIsReview,
  getUserReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/review-user", authenticateToken, createUserReview);
router.get("/review-user/:rental_id", authenticateToken, getUserIsReview);
router.post("/review-equipment", authenticateToken, createEquipmentReview);
router.get(
  "/review-equipment/:rental_id",
  authenticateToken,
  getEquipmentIsReview,
);
router.get("/review-user/user/:user_id", getUserReviews);
router.get("/review-equipment/equipment/:equipment_id", getEquipmentReviews);
router.get("/reviews-given/:user_id", getUserGivesReviews);

export default router;
