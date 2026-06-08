import { Server } from "socket.io";
import authentificateSocket from "../middleware/authentificateSocket.middleware.js";
import {
  createMessageService,
  markMessagesAsReadService,
} from "./conversation.service.js";
import Equipment from "../models/Equipment.js";

export function sendNotification(io, user_id, { type, message, data }) {
  io.to(`user_${user_id}`).emit("notification", {
    id: Date.now(),
    type,
    message,
    data,
    read: false,
    created_at: new Date().toISOString(),
  });
}
export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [process.env.CLIENT_URL, process.env.FRONT_URL],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(authentificateSocket);

  io.on("connection", (socket) => {
    socket.join(`user_${socket.user_id}`);
    //conversation
    socket.on("join_conversation", (conversation_id) => {
      socket.join(`conversation_${conversation_id}`);
    });

    socket.on("leave_conversation", (conversation_id) => {
      socket.leave(`conversation_${conversation_id}`);
    });

    socket.on("send_message", async ({ conversation_id, content }) => {
      try {
        const { message, receiver_id, sender } = await createMessageService({
          conversation_id,
          sender_id: socket.user_id,
          content,
        });
        const data = message.dataValues;
        //notification
        io.to(`conversation_${conversation_id}`).emit("new_message", data);
        sendNotification(io, receiver_id, {
          type: "nouveau_message",
          message: `Vous avez un nouveau message de ${sender.first_name} ${sender.last_name}`,
          data: { conversation_id },
        });
      } catch (err) {
        console.error(err);
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
        console.error(err);
        socket.emit("error", {
          error: "Erreur lors de la mise à jour des messages",
        });
      }
    });
    socket.on("payment_success", async ({ equipment_id }) => {
      try {
        const equipment = await Equipment.findByPk(equipment_id, {
          attributes: ["equipment_id", "owner_id", "title"],
        });
        if (!equipment) return;
        sendNotification(io, equipment.owner_id, {
          type: "location_payee_par_locataire",
          message: `La location pour "${equipment.title}" a été payee par le locataire. La location est maintenant confirmee, n'oubliez pas de vous donner un point de rendez-vous!`,
          data: { equipment_id },
        });
      } catch (err) {
        console.error(err);
      }
    });
    socket.on("disconnect", () => {
      console.log(`User ${socket.user_id} disconnected`);
    });
  });

  return io;
}
