import { logger } from "../../logger/logger.js";
import * as profileServices from "./profile.services.js";

export const createProfile = async (req, res) => {
  try {
    const data = await profileServices.userProfile(req.user._id, req.body);
    res.status(200).json({ data: data, message: "Profile saved" });
  } catch (error) {
    logger.error(error);
    res.status(error.status || 500).json({
      success: false,
      error,
      message: error.message || "Error occured in controller",
    });
  }
};

export const getPeople = async (req, res) => {
  try {
    const searchResult = await profileServices.getPeople(req.body);
    res.status(200).json({
      message: "Here are people matching your interest",
      data: searchResult,
    });
  } catch (error) {
    logger.error(error);
    res.status(error.status || 500).json({
      success: false,
      error,
      message: error.message || "Error occured in controller",
    });
  }
};
