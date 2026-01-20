import User from "./Models/User";

async function UserSync() {
  try {
    await User.sync({ alter: true });
    console.log("Table et Model synchronisés");
  } catch (err) {
    console.log(err);
  }
}
UserSync();

async function sequelizeAuthentification() {
  try {
    await sequelize.authenticate();
    console.log("succès de la connection");
  } catch (err) {
    console.log(err);
  }
}

sequelizeAuthentification();

console.log("autre tache");
