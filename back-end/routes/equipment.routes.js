import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  getEquipmentByUser,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.get("/equipment", getAllEquipment);
router.get("/equipment/:id", getEquipmentById);
router.get("/user/:id/equipment", getEquipmentByUser);
router.post("/new-equipment", createEquipment);

export default router;
