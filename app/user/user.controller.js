import { logger } from "../../logger/logger.js";
import * as userService from "./user.services.js";

export const register = async (req, res) => {
  try {
    const data = await userService.register(req.body);
    res
      .status(201)
      .json({ data: data, message: "User registered successfully." });
  } catch (error) {
    logger.error(error);
    res
      .status(error.status || 500)
      .json({
        success: false,
        error,
        message: error.message || "Error occured in controller",
      });
  }
};

export const login = async (req, res) => {
  try {
    const data = await userService.login(req.body);
    res.status(200).json({ message: "Login successful.", data: data });
  } catch (error) {
    logger.error(error);
    res
      .status(error.status || 500)
      .json({
        success: false,
        error,
        message: error.message || "Error occured in controller",
      });
  }
};
