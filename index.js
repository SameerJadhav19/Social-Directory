import dotenv from "dotenv";
dotenv.config();
import express from "express";
import database from "./config/database.js";
import { logger } from "./logger/logger.js";
import routes from "./app/routes/index.js"
import cors from "cors";

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

database();
app.use("/api/", routes());

// connect to the server
app.listen(PORT, () => {
  logger.info(`Listening to the server`);
});

export default app;
