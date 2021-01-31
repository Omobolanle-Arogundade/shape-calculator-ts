import { Router } from "express";
import listAllRoutes from "express-list-endpoints";
import Table from "cli-table";

import AuthRouter from "./modules/auth/auth.router";

import { name, version } from "../package.json";
import logger from "../config/logger";

export class IndexRoute {
  public router: Router = Router();
  public exceptModules: string[] = ["auth"]; // since auth routes do not need authentication

  public constructor() {
    this.initRoutes();
    this.logRoutes();
  }

  private initRoutes(): void {
    this.router.use("/auth", AuthRouter);
    this.router.all("*", (req, res): any =>
      res.send(`Welcome to ${name} v-${version}`)
    );
  }

  private logRoutes = (): void => {
    let routesList = listAllRoutes(this.router);
    routesList = routesList.map((route: any): object => {
      const obj = {};
      obj[route.path] = route.methods.join(" | ");
      return obj;
    });
    const table = new Table();
    table.push({ Endpoints: "Methods" }, ...routesList);

    logger.info(`THESE ARE THE AVAILABLE ENDPOINTS: \n${table.toString()}`);
  };
}
