import { envs } from "./envs";

//INIT ENVIRONMENT VARS
require("dotenv").config();

const {
  env,
  database: { host, username, password, database, dialect }
} = envs;

const defaultConfig = {
  host,
  database,
  username,
  password,
  dialect: dialect || "postgres", //default is 'posgres'
  dialectOptions: {
    dateStrings: true,
    typeCast: (field, next): any => {
      if (field.type === "DATETIME") return field.string();
      return next();
    }
  }
};

const storageConfig = {
  migrationStorage: "json",
  migrationStoragePath: "./database/migration-metadata.json",
  seederStorage: "json",
  seederStoragePath: "./database/seeder-metadata.json"
};

module.exports = {
  [env]: { ...defaultConfig, ...storageConfig }
};
