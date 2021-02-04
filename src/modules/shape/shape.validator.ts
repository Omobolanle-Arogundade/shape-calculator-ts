import Joi from "@hapi/joi";
import { shapes } from "../../common/constants/shapes.contants";

export class ShapeValidator {
  public calculateArea: object = {
    body: Joi.object().keys({
      shape: Joi.string()
        .required()
        .valid(shapes.SQUARE, shapes.RECTANGLE, shapes.CIRCLE, shapes.TRIANGLE)
        .messages({
          "string.empty": `Shape cannot be an empty field`,
          "any.required": `Shape is a required field`
        }),
      dimensions: Joi.object()
        .required()
        .keys({
          side: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `side cannot be an empty field`,
              "number.min": `side should have a minimum value of {#limit}`,
              "any.required": `side is a required field`
            }),
          length_a: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `length_a cannot be an empty field`,
              "number.min": `length_a should have a minimum value of {#limit}`,
              "any.required": `length_a is a required field`
            }),
          length_b: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `length_b cannot be an empty field`,
              "number.min": `length_b should have a minimum value of {#limit}`,
              "any.required": `length_b is a required field`
            }),
          length_c: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `length_c cannot be an empty field`,
              "number.min": `length_c should have a minimum value of {#limit}`,
              "any.required": `length_c is a required field`
            }),
          radius: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `radius cannot be an empty field`,
              "number.min": `radius should have a minimum value of {#limit}`,
              "any.required": `radius is a required field`
            }),
          length: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `length cannot be an empty field`,
              "number.min": `length should have a minimum value of {#limit}`,
              "any.required": `length is a required field`
            }),
          breadth: Joi.number()
            .min(1)
            .forbidden()
            .messages({
              "number.empty": `breadth cannot be an empty field`,
              "number.min": `breadth should have a minimum value of {#limit}`,
              "any.required": `breadth is a required field`
            })
        })
        .when("shape", {
          is: shapes.CIRCLE,
          then: Joi.object({
            radius: Joi.required().messages({
              "any.required": `radius is required for ${shapes.CIRCLE} shape`
            })
          })
        })
        .when("shape", {
          is: shapes.RECTANGLE,
          then: Joi.object({
            length: Joi.required().messages({
              "any.required": `length is required for ${shapes.RECTANGLE} shape`
            }),
            breadth: Joi.required().messages({
              "any.required": `breadth is required for ${shapes.RECTANGLE} shape`
            })
          })
        })
        .when("shape", {
          is: shapes.SQUARE,
          then: Joi.object({
            side: Joi.required().messages({
              "any.required": `side is required for ${shapes.SQUARE} shape`
            })
          })
        })
        .when("shape", {
          is: shapes.TRIANGLE,
          then: Joi.object({
            length_a: Joi.required().messages({
              "any.required": `length_a is required for ${shapes.TRIANGLE} shape`
            }),
            length_b: Joi.required().messages({
              "any.required": `length_b is required for ${shapes.TRIANGLE} shape`
            }),
            length_c: Joi.required().messages({
              "any.required": `length_c is required for ${shapes.TRIANGLE} shape`
            })
          })
        })
    })
  };

  public getCalculations: object = {
    query: Joi.object().keys({
      order: Joi.string(),
      sort: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer()
    })
  };
}

export default new ShapeValidator();
