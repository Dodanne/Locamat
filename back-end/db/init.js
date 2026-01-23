import { sequelize } from "./sequelize";

export default async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("succès de la connexion avec la db");

    await sequelize.sync({ alter: true });
    console.log("Tables et Models synchronisés");
  } catch (err) {
    console.log(err);
  }
}
