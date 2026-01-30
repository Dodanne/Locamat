import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  getEquipmentByUser,
} from "../controllers/equipment.controller.js";
import { uploadEquipment } from "../config/multer.config.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/equipment", getAllEquipment);
router.get("/equipment/:id", getEquipmentById);
router.get("/user/:id/equipment", getEquipmentByUser);
router.post(
  "/new-equipment",
  authenticateToken,
  uploadEquipment.single("photo"),
  createEquipment,
);

export default router;
