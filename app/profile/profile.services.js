import user from "../user/user.model.js";
import profile from "./profile.model.js";
import {
  profileValidator,
  interestValidator,
} from "../validation/profile.validation.js";
import { logger } from "../../logger/logger.js";

export const userProfile = async (userId, body) => {
  try {
    const validation = profileValidator().validate(body);
    if (validation.error) {
      logger.error(validation.error);
      throw { status: 400, message: "Please check the input." };
    } else {
      const isUser = await user.findOne({ _id: userId });
      if (!isUser) {
        throw { status: 404, message: "User not found" };
      } else {
        const hasProfile = await profile.findOne({ userId: userId });
        if (hasProfile) {
          throw { status: 409, message: "Profile already exists" };
        } else {
          const newProfile = {
            userId: userId,
            name: body.name,
            dateOfBirth: body.dateOfBirth,
            location: body.location,
            interests: body.interests,
          };
          const data = await profile.create(newProfile);
          return data;
        }
      }
    }
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error from service",
    };
  }
};

export const getPeople = async (body) => {
  try {
    const validation = interestValidator().validate(body);
    if (validation.error) {
      logger.error(validation.error);
      throw { status: 400, message: "Please check the input." };
    } else {
      const search = await profile.find({
        $or: [{ interests: { $regex: body.interests, $options: "i" } }],
      });
      if (!search.length) {
        throw {
          status: 404,
          message: "Cannot find people matching your interests",
        };
      } else {
        return search;
      }
    }
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error from service",
    };
  }
};
