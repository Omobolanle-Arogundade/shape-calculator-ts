import { Router } from "express";

import { name, version } from "../package.json";

export class IndexRoute {
  public router: Router = Router();
  public exceptModules: string[] = ["auth", "s3"];

  public constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.all("*", (req, res): any =>
      res.send(`Welcome to ${name} v-${version}`)
    );
  }
}
