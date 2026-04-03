import { Server } from "socket.io";
import authentificateSocket from "../middleware/authentificateSocket.middleware.js";
import {
  createMessageService,
  markMessagesAsReadService,
} from "./conversation.service.js";

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(authentificateSocket);

  io.on("connection", (socket) => {
    socket.join(`user_${socket.user_id}`);
    socket.on("join_conversation", (conversation_id) => {
      socket.join(`conversation_${conversation_id}`);
    });

    socket.on("leave_conversation", (conversation_id) => {
      socket.leave(`conversation_${conversation_id}`);
    });

    socket.on("send_message", async ({ conversation_id, content }) => {
      console.log("SEND MESSAGE", {
        conversation_id,
        content,
        user: socket.user_id,
      });
      try {
        const { message, receiver_id } = await createMessageService({
          conversation_id,
          sender_id: socket.user_id,
          content,
        });
        const data = message.dataValues;
        console.log(data);
        io.to(`conversation_${conversation_id}`).emit("new_message", data);
        io.to(`user_${receiver_id}`).emit("new_message_notification", {
          conversation_id,
          message: data,
        });
      } catch (err) {
        console.log(err);
        socket.emit("error", { error: "Erreur lors de l'envoi du message" });
      }
    });
    socket.on("read_messages", async ({ conversation_id }) => {
      try {
        await markMessagesAsReadService({
          conversation_id,
          user_id: socket.user_id,
        });

        io.to(`conversation_${conversation_id}`).emit("read_messages", {
          conversation_id,
          user_id: socket.user_id,
        });
      } catch (err) {
        console.log(err);
        socket.emit("error", {
          error: "Erreur lors de la mise à jour des messages",
        });
      }
    });
    socket.on("disconnect", () => {
      console.log(`User ${socket.user_id} disconnected`);
    });
  });

  return io;
}
