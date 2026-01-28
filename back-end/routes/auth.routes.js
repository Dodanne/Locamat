import express from "express";
const router = express.Router();
import { postLogin } from "./../controllers/auth.controller.js";

router.post("/login", postLogin);
export default router;
