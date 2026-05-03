import express from "express";
import { authenticateToken } from "../middleware/authentificateToken.js";
import {
  createConversation,
  // createMessage,
  getMessages,
  getConversations,
  deleteConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/conversations", authenticateToken, getConversations);
router.post("/conversations", authenticateToken, createConversation);
router.get(
  "/conversations/:conversation_id/messages",
  authenticateToken,
  getMessages,
);
// router.post("/messages", authenticateToken, createMessage);
router.delete(
  "/conversations/:conversation_id",
  authenticateToken,
  deleteConversation,
);

export default router;
