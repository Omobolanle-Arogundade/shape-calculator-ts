import * as dotenv from "dotenv";
import * as Joi from "@hapi/joi";
import { Config } from "../src/interfaces/config.interface";

dotenv.config({ path: require("find-config")(".env") });

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
      .description("Database Host"),
    DB_USER: Joi.string()
      .required()
      .description("Database Username"),
    DB_PASSWORD: Joi.string()
      .required()
      .description("Database Password"),
    DB_NAME: Joi.string()
      .required()
      .description("Database Name"),
    DB_DRIVER: Joi.string()
      .required()
      .description("Database Driver"),
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
    database: envVars.DB_NAME + (envVars.NODE_ENV === "test" ? "-test" : ""),
    dialect: envVars.DB_DRIVER,
  },
};
