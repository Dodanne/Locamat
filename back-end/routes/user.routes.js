import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controllers/user.controller.js";
import { uploadUser } from "../config/multer.config.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/new-user", uploadUser.single("photo"), createUser);

export default router;
