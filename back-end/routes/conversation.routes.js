import express from "express";
import { authenticateToken } from "../middleware/authentificateToken.js";
import {
  createConversation,
  createMessage,
  getMessages,
  getConversations,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/conversations", authenticateToken, getConversations);
router.post("/conversations", authenticateToken, createConversation);
router.get(
  "/conversations/:conversation_id/messages",
  authenticateToken,
  getMessages,
);
router.post("/messages", authenticateToken, createMessage);

export default router;
