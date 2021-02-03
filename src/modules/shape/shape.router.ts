import controller from "./shape.controller";
import { Router } from "express";
import Middleware from "../../common/interfaces/middlewares.interface";
import auth from "../../middlewares/auth.middleware";
import validateMiddleware from "../../middlewares/validate.middleware";
import ShapeValidator from "./shape.validator";

const { validate } = validateMiddleware;

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
      .get(
        "/",
        auth.verifyAuth,
        validate(ShapeValidator.getCalculations),
        controller.indexPartition
      )
      .post(
        "/",
        auth.verifyAuth,
        validate(ShapeValidator.calculateArea),
        controller.calculateArea
      );
  }
}

export default new UserRoute().router;
