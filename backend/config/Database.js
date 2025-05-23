import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    dialectOptions: {
      socketPath: process.env.DB_HOST // Contoh: /cloudsql/project:region:instance-name
    },
    logging: false,
  }
);

export default db;
