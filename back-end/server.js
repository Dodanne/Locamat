import app from "./app.js";
import "./config/env.js";
import initDb from "./db/init.js";
import initSocket from "./config/socket.config.js";

const PORT = process.env.PORT;

const startServer = async () => {
  await initDb();
  const httpServer = initSocket(app);
  httpServer.listen(PORT, () => {
    console.log(`Back-end lancé sur https://locamat.onrender.com`);
  });
};

startServer();
