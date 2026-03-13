import express from "express";
import { authenticateToken } from "../middleware/authentificateToken.js";
import { getConversations } from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/conversations", authenticateToken, getConversations);

export default router;
