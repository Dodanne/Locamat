import app from "./app.js";
import "./config/env.js";
import initDb from "./db/init.js";
import { createServer } from "http";
import { initializeSocket } from "./services/socket.service.js";
import { setIo } from "./config/io.js";

const PORT = process.env.PORT;

const startServer = async () => {
  await initDb();
  const httpServer = createServer(app);
  const io = initializeSocket(httpServer);
  setIo(io);
  httpServer.listen(PORT, () => {
    console.log(`Back-end lancé sur https://locamat.onrender.com`);
  });
};

startServer();
