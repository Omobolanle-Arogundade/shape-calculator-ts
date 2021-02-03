import { Sequelize } from "sequelize";

import express = require("express");
import cors = require("cors");

import Database from "./database";
import { IndexRoute } from "./routes";
import { envs } from "../config/envs";
import { MorganLogger } from "../config/morgan";

class App {
  public express: express.Application;
  public sequelize: Sequelize;

  /* uncomment this line to instance and enable jobs */
  // public schedule: Schedule;

  public constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();

    /* uncomment this call to enable jobs */
    /* if (!process.env.DISABLE_SCHEDULE) this.jobs(); */
  }

  private database(): void {
    this.sequelize = new Database().sequelize;
  }

  private middlewares(): void {
    if (envs.env !== "test") {
      const morgan = new MorganLogger();
      this.express.use(morgan.successHandler);
      this.express.use(morgan.errorHandler);
    }

    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use("/", new IndexRoute().router);
  }
}
export default new App().express;
