import { Sequelize } from "sequelize";

const sequelize = new Sequelize("locamat-v2", "root", "root", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default sequelize;
