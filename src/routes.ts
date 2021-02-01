import { Router } from "express";
import { resolve } from "path";
import { existsSync } from "fs";
import { plural } from "pluralize";
import listAllRoutes from "express-list-endpoints";
import Table from "cli-table";

import { name, version } from "../package.json";
import logger from "../config/logger";
import { getDirectories } from "./common/utils/fs.util";
import { envs } from "../config/envs";

const env = envs.env || "development";
const prefix = env == "development" ? "" : "build/";

export class IndexRoute {
  public router: Router = Router();
  public singleModules: string[] = ["auth"];

  public constructor() {
    this.initRoutes();
    this.logRoutes();
  }

  private initRoutes(): void {
    this.initApi();
    // this.router.use("/auth", AuthRouter);
    this.router.all("*", (req, res): any =>
      res.send(`Welcome to ${name} v-${version}`)
    );
  }

  public initApi = (): void => {
    const ext = env == "development" ? ".ts" : ".js";
    let modules = getDirectories(resolve(`${prefix}src/modules`));
    modules.forEach(
      async (module): Promise<any> => {
        const dir = `${prefix}src/modules/${module}/${module}.router${ext}`;
        if (existsSync(resolve(dir))) {
          this.router.use(
            `/${this.singleModules.includes(module) ? module : plural(module)}`,
            require(`./modules/${module}/${module}.router`).default
          );
        }
      }
    );
  };

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
