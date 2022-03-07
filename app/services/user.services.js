import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (body) => {
  const findUser = await user.findOne({ email: body.email });
  if (findUser) {
    return "user exist";
  } else {
    const userData = new user({
      email: body.email,
      phone: body.phone,
      password: body.password
    })
    const data = await userData.save();
    return data;
  }
};

export const login = async (body) =>{
  const findUser = await user.findOne({ email: body.email });
  if (!findUser) {
    return "user not found";
  }
  else{
    const payload = {
      _id: findUser._id,
      email: findUser.email,
      password: findUser.password
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "200H"});
    const comparePassword = await bcrypt.compare(body.password, findUser.password);
    if (!comparePassword) {
      return "invalid password";
    }else{
      return {id: findUser._id,token: token,}
    }
  }
}