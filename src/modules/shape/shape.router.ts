import controller from "./shape.controller";
import { Router } from "express";
import Middleware from "../../common/interfaces/middlewares.interface";
import auth from "../../middlewares/auth.middleware";

export class UserRoute {
  public router: Router = Router();
  public controller = controller;
  public createResource: boolean = true;
  public middlewares: Middleware = {};

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router
      .get("/", auth.verifyAuth, controller.indexPartition)
      .post("/", auth.verifyAuth, controller.calculateArea);
  }
}

export default new UserRoute().router;
