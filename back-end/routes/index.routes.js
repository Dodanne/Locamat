import express from "express";
import equipmentRoutes from "./equipment.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import rentalRoutes from "./rental.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use(equipmentRoutes);
router.use(userRoutes);
router.use(categoryRoutes);
router.use(rentalRoutes);
router.use(authRoutes);

export default router;
