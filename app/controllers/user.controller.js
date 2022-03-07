import { logger } from "../../logger/logger.js";
import { userValidator, loginValidator } from "../validation/user.validation.js";
import * as userService from "../services/user.services.js";
export const register = async (req, res) => {
  try {
    const validation = userValidator().validate(req.body);
    if (validation.error) {
      logger.error(validation.error);
      return res.status(400).json({ message: "Please check the input." });
    } else {
      const data = await userService.register(req.body);
      if (data === "user exist") {
        logger.error(data);
        res.status(400).json({ message: "User already exist." });
      } else {
        res
          .status(201)
          .json({ data: data, message: "User registered successfully." });
      }
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try{
    const validation = loginValidator().validate(req.body)
    if (validation.error){
      logger.error(validation.error)
      res.status(400).json({ message:"Please check the email or password."})
    }
    else{
      const data = await userService.login(req.body)
      if (data==="user not found"){
        res.status(400).json({ message: "Please check email or password."})
      }
      else if(data==="invalid password"){
        res.status(400).json({ message: "Please check email or password."})
      }
      else{
        res.status(200).json({ message: "Login successful.", data: data })
      }
    }
  }catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
