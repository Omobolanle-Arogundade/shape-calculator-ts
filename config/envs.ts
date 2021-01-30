import * as dotenv from "dotenv";
import * as path from "path";
import * as Joi from "@hapi/joi";
import { Config } from "../src/interfaces/config.interface";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema: any = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    SECRET_KEY: Joi.string()
      .required()
      .description("Secret Key"),
    DB_HOST: Joi.string()
      .required()
      .description("Secret Key"),
    DB_USER: Joi.string()
      .required()
      .description("Secret Key"),
    DB_PASSWORD: Joi.string()
      .required()
      .description("Secret Key"),
    DB_NAME: Joi.string()
      .required()
      .description("Secret Key"),
    DB_DRIVER: Joi.string()
      .required()
      .description("Secret Key"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    url: envVars.SECRET_KEY,
  },
  database: {
    host: envVars.DB_HOST,
    username: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME + envVars.NODE_ENV === "test" ? "-test" : "",
    dialect: envVars.DB_DRIVER,
  },
};