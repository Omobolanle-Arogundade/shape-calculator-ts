import Joi from "@hapi/joi";

export const login = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required field`,
        "string.email": `You need to enter a valid email`
      }),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .messages({
        "string.empty": `Password cannot be an empty field`,
        "string.min": `Password should have a minimum length of {#limit}`,
        "string.max": `Password should have a maximum length of {#limit}`,
        "any.required": `Password is a required field`
      })
  })
};
