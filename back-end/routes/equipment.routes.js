import express from "express";
import {
  createEquipment,
  get6FirstEquipment,
  getAllEquipments,
  getEquipmentById,
  getEquipmentByUser,
  getSearchEquipments,
  deleteEquipment,
  updateEquipment,
} from "../controllers/equipment.controller.js";
import { uploadEquipment } from "../middleware/upload.middleware.js";
import { authenticateToken } from "../middleware/authentificateToken.js";
import { isAdmin } from "./../middleware/isAdmin.js";
const router = express.Router();

router.get("/equipment", getAllEquipments);
router.get("/equipment6first", get6FirstEquipment);
router.get("/equipment/:id", getEquipmentById);
router.get("/user/:id/equipment", getEquipmentByUser);
router.get("/equipments/search", getSearchEquipments);
router.delete("/equipment/:id", authenticateToken, isAdmin, deleteEquipment);
router.patch(
  "/equipment/:id",
  authenticateToken,
  uploadEquipment.single("photo"),
  updateEquipment,
);
router.post(
  "/new-equipment",
  authenticateToken,
  uploadEquipment.single("photo"),
  createEquipment,
);

export default router;
