import app from "./app.js";
import "./config/env.js";
import initDb from "./db/init.js";

const PORT = process.env.PORT;

const startServer = async () => {
  await initDb();

  app.listen(DB_PORT, () => {
    console.log(`Back-end lancé sur http://localhost:${PORT}`);
  });
};

startServer();
