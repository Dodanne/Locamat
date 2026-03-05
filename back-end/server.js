import app from "./app.js";
import "./config/env.js";
import initDb from "./db/init.js";

const PORT = process.env.PORT || 3033;

const startServer = async () => {
  try {
    await initDb();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Back-end lancé sur ${PORT}`);
    });
  } catch (err) {
    console.error("Impossible de démarrer le serveur:", err);
    process.exit(1); // Node quitte si erreur
  }
};
startServer();
