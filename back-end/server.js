import app from "./app.js";
import "./config/env.js";
import initDb from "./db/init.js";
import { createServer } from "http";
import { initializeSocket } from "./services/socket.service.js";

const PORT = process.env.PORT;

const startServer = async () => {
  await initDb();
  const httpServer = createServer(app);
  initializeSocket(httpServer);
  httpServer.listen(PORT, () => {
    console.log(`Back-end lancé sur https://locamat.onrender.com`);
  });
};

startServer();
