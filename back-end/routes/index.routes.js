import express from "express";
import equipmentRoutes from "./equipment.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import rentalRoutes from "./rental.routes.js";
import authRoutes from "./auth.routes.js";
import paiementRoutes from "./paiement.routes.js";
import reviewRoutes from "./review.routes.js";
import conversationRoutes from "./conversation.routes.js";
const router = express.Router();

router.use(equipmentRoutes);
router.use(userRoutes);
router.use(categoryRoutes);
router.use(rentalRoutes);
router.use(authRoutes);
router.use(paiementRoutes);
router.use(reviewRoutes);
router.use(conversationRoutes);

export default router;
