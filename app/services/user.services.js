import bcrypt from "bcrypt";
import user from "../models/user.model.js";
export const register = async (body) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(body.password, salt);
  body.password = hash;
  const data = await user.create(body);
  return data;
};
