import sequelize from "./sequelize.js";
import "../models/index.js";

export default async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("succès de la connexion avec la db");

    await sequelize.sync();
    console.log("Tables et Models synchronisés");
  } catch (err) {
    console.error("Impossible de démarrer le serveur:", err);
    process.exit(1); // Node quitte si erreur
  }
}
