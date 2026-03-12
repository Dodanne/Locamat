import { createServer } from "http";
import { Server } from "socket.io";

export default function initSocket(app) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: process.env.FONT_URL },
  });
  io.on("connection", (socket) => {
    console.log("User connecté", socket.id);
  });
}
