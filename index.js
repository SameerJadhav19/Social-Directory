import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import database from "./config/database.js";
import { logger } from "./logger/logger.js";
import routes from "./app/routes/index.js"

const app = express();
const { port } = process.env;

app.use(express.json());

database();
app.use("/api/", routes());

// connect to the server
app.listen(port, () => {
  logger.info(`Listening to the server`);
});

export default app;
