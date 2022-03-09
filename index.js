import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import database from "./config/database.js";
import { logger } from "./logger/logger.js";

const app = express();
const { PORT } = process.env;

app.use(express.json());

// define a route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

database();

// connect to the server
app.listen(PORT, () => {
  logger.info(`Listening to the server`);
});

export default app;
