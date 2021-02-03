import Joi from "@hapi/joi";

export class UserValidator {
  public getUsers: object = {
    query: Joi.object().keys({
      order: Joi.string(),
      sort: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer()
    })
  };

  public createUser: object = {
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
        }),
      name: Joi.string()
        .required()
        .messages({
          "string.empty": `Name cannot be an empty field`,
          "any.required": `Name is a required field`
        })
    })
  };

  public getById: object = {
    params: Joi.object().keys({
      id: Joi.number().exist()
    })
  };

  public updateUser: object = {
    params: Joi.object().keys({
      id: Joi.number().exist()
    }),
    body: Joi.object().keys({
      name: Joi.string()
        .optional()
        .messages({
          "string.empty": `Name cannot be an empty field`
        })
    })
  };
}

export default new UserValidator();
