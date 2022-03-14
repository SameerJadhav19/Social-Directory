import Joi from "joi";

export const profileValidator = () => {
  const profileValidation = Joi.object({
    name: Joi.string()
      .required()
      .pattern(
        /^(([a-zA-Z]{2,}\s)?[a-zA-Z]{1,}(\s[a-zA-Z]{1,})?)/
      ),
    dateOfBirth: Joi.string()
      .required()
      .pattern(
        /(((0)[0-9])|((1)[0-2]))[-|\/]([0-2][0-9]|(3)[0-1])[-|\/]\d{4}/
      ),
    location: Joi.string().required(),
    interests: Joi.array().required()
  });
  return profileValidation;
};

export const interestValidator = () => {
  const interestValidation = Joi.object({
    interests: Joi.string().required()
  });
  return interestValidation;
};