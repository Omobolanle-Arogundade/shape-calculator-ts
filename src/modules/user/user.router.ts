import controller from "./user.controller";
import { Router } from "express";
import Middleware from "../../common/interfaces/middlewares.interface";
import auth from "../../middlewares/auth";

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
      .get("/", auth.verifyAuth, controller.index)
      .post("/", auth.verifyAuth, controller.store);

    this.router
      .get("/:id", auth.verifyAuth, controller.get)
      .put("/:id", auth.verifyAuth, controller.update)
      .delete("/:id", auth.verifyAuth, controller.delete);
  }
}

export default new UserRoute().router;
