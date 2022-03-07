import mongoose from "mongoose";
import { logger } from "../logger/logger.js";

/**
 * To connect to the database
 */
const database = () => {
  try {
    const database = process.env.DATABASE_URL;
    mongoose.connect(database);
    logger.info("Connected to the database");
  } catch (e) {
    logger.error("Could not connect to the database", e);
  }
};
export default database;
