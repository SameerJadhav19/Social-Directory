import user from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  userValidator,
  loginValidator,
} from "../validation/user.validation.js";
import { logger } from "../../logger/logger.js";

export const register = async (body) => {
  try {
    const validation = userValidator().validate(body);
    if (validation.error) {
      logger.error(validation.error);
    } else {
      const findUser = await user.findOne({ email: body.email });
      if (findUser) {
        throw { status: 409, message: "User already exists" };
      } else {
        const userData = new user({
          email: body.email,
          phone: body.phone,
          password: body.password,
        });
        const data = await userData.save();
        return data;
      }
    }
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error from service",
    };
  }
};

export const login = async (body) => {
  try {
    const validation = loginValidator().validate(body);
    if (validation.error) {
      logger.error(validation.error);
      throw { status: 400, message: "Please check the input" };
    } else {
      const findUser = await user.findOne({ email: body.email });
      if (!findUser) {
        throw { status: 404, message: "User did not exist" };
      } else {
        const payload = {
          _id: findUser._id,
          email: findUser.email,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "200H",
        });
        const comparePassword = await bcrypt.compare(
          body.password,
          findUser.password
        );
        if (!comparePassword) {
          throw { status: 400, message: "Invalid Email or Password" };
        } else {
          return { id: findUser._id, token: token };
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
