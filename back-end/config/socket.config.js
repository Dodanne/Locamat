import { createServer } from "http";
import { Server } from "socket.io";
import { Message } from "../models/index.js";

export default function initSocket(app) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: process.env.FONT_URL },
  });
  io.on("connection", (socket) => {
    console.log("User connecté", socket.id);

    socket.on("join_conversation", (conversation_id) => {
      socket.join(`conversation_${conversation_id}`);
    });

    socket.on("send_message", async (data) => {
      try {
        const message = await Message.create({
          conversation_id: data.conversation_id,
          sender_id: data.sender_id,
          content: data.content,
        });
        io.to(`conversation_${data.conversation_id}`).emit(
          "receive_message",
          message,
        );
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User déconnecté:", socket.id);
    });
  });

  return httpServer;
}
