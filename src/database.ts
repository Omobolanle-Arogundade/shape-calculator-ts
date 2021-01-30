import { Sequelize, Error } from "sequelize";

import config = require("../config/database");
import { envs } from "../config/envs";
import logger from "../config/logger";

const env = envs.env || "development";

export default class Database {
  public config: any = config[env];
  public sequelize: Sequelize;

  public constructor() {
    this.connect();
    this.verifyConnection();
  }

  public connect(): void {
    this.sequelize = new Sequelize(this.config);
  }

  public verifyConnection(): void {
    this.sequelize
      .authenticate()
      .then((): void => {
        logger.info(
          `Connection successful on database: ${this.sequelize.config.database}`
        );
      })
      .catch((error: Error): void => {
        logger.info(
          `Connection failed on database: ${this.sequelize.config.database}, ${error.message}`
        );
      });
  }
}
