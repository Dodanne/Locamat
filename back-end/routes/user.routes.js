import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  getAllRoleUsers,
  getAllRoleAdmin,
  patchBannedUser,
  patchIsAdmin,
} from "../controllers/user.controller.js";
import { uploadUser } from "../config/multer.config.js";
import { authenticateToken } from "../middleware/authentificateToken.js";
import { isSuperAdmin } from "./../middleware/isSuperAdmin.js";
import { isAdmin } from "./../middleware/isAdmin.js";
const router = express.Router();

router.get("/users", authenticateToken, getAllUsers);
router.get("/role/users", authenticateToken, isAdmin, getAllRoleUsers);
router.patch("/:id/ban", authenticateToken, isAdmin, patchBannedUser);
router.patch("/:id/isAdmin", authenticateToken, isSuperAdmin, patchIsAdmin);
router.get("/role/admin", authenticateToken, isAdmin, getAllRoleAdmin);
router.get("/user/:id", authenticateToken, getUserById);
router.post("/new-user", uploadUser.single("photo"), createUser);

export default router;
