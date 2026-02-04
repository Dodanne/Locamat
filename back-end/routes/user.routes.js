import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controllers/user.controller.js";
import { uploadUser } from "../config/multer.config.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", authenticateToken, getAllUsers);
router.get("/user/:id", authenticateToken, getUserById);
router.post("/new-user", uploadUser.single("photo"), createUser);

export default router;
