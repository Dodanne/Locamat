import sequelize from "./sequelize.js";
import "../Models/index.js";

export default async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("succès de la connexion avec la db");

    await sequelize.sync();
    console.log("Tables et Models synchronisés");
  } catch (err) {
    console.log(err);
  }
}
