import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // load from .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",      
    logging: false,        // disable SQL logging (set to console.log for debugging)
  }
);

export default sequelize;