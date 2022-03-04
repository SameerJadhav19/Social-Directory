import e from "express";
import { logger } from "../../logger/logger.js";
import { userValidator } from "../validation/user.validation.js";
import * as userService from "../services/user.services.js";
export const register = async (req, res) => {
  try {
    const validation = userValidator().validate(req.body);
    if (validation.error) {
      logger.error(validation.error);
      return res.status(401).json({ message: "Please check the input." });
    } else {
      const data = await userService.register(req.body);
      res
        .status(201)
        .json({ data: data, message: "user registered successfully." });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
