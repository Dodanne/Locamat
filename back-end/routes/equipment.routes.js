import express from "express";
import {
  createEquipment,
  get6FirstEquipment,
  getAllEquipments,
  getEquipmentById,
  getEquipmentByUser,
  getFiltredEquipments,
  getFiltredSearch,
  deleteEquipment,
} from "../controllers/equipment.controller.js";
import { uploadEquipment } from "../config/multer.config.js";
import { authenticateToken } from "../middleware/authentificateToken.js";
import { isAdmin } from "./../middleware/isAdmin.js";
const router = express.Router();

router.get("/equipment", getAllEquipments);
router.get("/equipment6first", get6FirstEquipment);
router.get("/equipment/:id", getEquipmentById);
router.get("/user/:id/equipment", getEquipmentByUser);
router.get("/equipments/search", getFiltredEquipments);
router.get("/equipments/search", getFiltredSearch);
router.delete("/equipment/:id", isAdmin, deleteEquipment);
router.post(
  "/new-equipment",
  authenticateToken,
  uploadEquipment.single("photo"),
  createEquipment,
);

export default router;
