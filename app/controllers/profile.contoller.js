import { logger } from "../../logger/logger.js";
import * as profileServices from "../services/profile.services.js";
import {
  profileValidator,
  interestValidator,
} from "../validation/profile.validation.js";

export const createProfile = async (req, res) => {
  try {
    const validation = profileValidator().validate(req.body);
    if (validation.error) {
      logger.error(validation.error);
      res.status(400).json({ message: "Please check the input." });
    } else {
      const data = await profileServices.userProfile(req.user._id, req.body);
      if (data === "profile exists") {
        res.status(400).json({ message: "Profile already exists" });
      } else if (data === "cannot save profile") {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(200).json({ data: data, message: "Profile saved" });
      }
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPeople = async (req, res) => {
  try {
    const validation = interestValidator().validate(req.body);
    if (validation.error) {
      logger.error(validation.error);
      res.status(400).json({ message: "Please check the input." });
    } else {
      const searchResult = await profileServices.getPeople(req.body);
      if (searchResult === "missing") {
        res
          .status(400)
          .json({ message: "Cannot find anything matching your search" });
      } else if (searchResult === "error") {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res
          .status(200)
          .json({ message: "Here are people matching your interest", data: searchResult });
      }
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
