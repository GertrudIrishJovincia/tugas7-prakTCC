const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    dialectOptions: {
      socketPath: process.env.DB_HOST,  // contoh: /cloudsql/project:region:instance-name
    },
    logging: false,
  }
);

module.exports = db;
