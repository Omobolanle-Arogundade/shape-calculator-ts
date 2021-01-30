import { Sequelize, Error } from "sequelize";

import config = require("../config/database");
import { envs } from "../config/envs";

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
        console.log(
          `Connection successful on database: ${this.sequelize.config.database}`
        );
      })
      .catch((error: Error): void => {
        console.log(
          `Connection failed on database: ${this.sequelize.config.database}, ${error.message}`
        );
      });
  }
}
