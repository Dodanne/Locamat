import app from "./app.js";
import "./config/env.js";
import initDb from "./db/init.js";

const PORT = process.env.PORT || 3033;

const startServer = async () => {
  await initDb();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Back-end lancé sur ${PORT}`);
  });
};

startServer();
