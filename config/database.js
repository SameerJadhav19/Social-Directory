import mongoose from "mongoose";
import {logger} from "../logger/logger.js"

/**
 * To connect to the database
 */
const database = async () => {
  try {
    const DATABASE = process.env.DATABASE;
    mongoose.connect(DATABASE);
    logger.info("Connected to the database");
  } catch (e) {
    logger.info("Could not connect to the database", e);
  }
};
export default database;