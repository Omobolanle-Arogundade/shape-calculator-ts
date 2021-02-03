import controller from "./user.controller";
import { Router } from "express";
import Middleware from "../../common/interfaces/middlewares.interface";
import auth from "../../middlewares/auth.middleware";
import validateMiddleware from "../../middlewares/validate.middleware";
import UserValidator from "./user.validator";

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
        validate(UserValidator.getUsers),
        controller.index
      )
      .post(
        "/",
        auth.verifyAuth,
        validate(UserValidator.createUser),
        controller.store
      );

    this.router
      .get(
        "/:id",
        auth.verifyAuth,
        validate(UserValidator.getById),
        controller.get
      )
      .put(
        "/:id",
        auth.verifyAuth,
        validate(UserValidator.updateUser),
        controller.update
      )
      .delete(
        "/:id",
        auth.verifyAuth,
        validate(UserValidator.getById),
        controller.delete
      );
  }
}

export default new UserRoute().router;
