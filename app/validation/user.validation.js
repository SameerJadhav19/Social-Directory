import Joi from "joi";

export const userValidator = () => {
  const registerValidation = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        /^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/
      ),
    phone: Joi.string()
      .required()
      .pattern(
        /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/
      ),
    password: Joi.string()
      .pattern(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
      .required(),
  });
  return registerValidation;
};

export const loginValidator = () => {
  const loginValidation = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        /^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/
      ),
    password: Joi.string()
      .pattern(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
      .required(),
  });
  return loginValidation;
};
