import controller from "./auth.controller";
import { Router } from "express";
import AuthValidator from "./auth.validator";
import validateMiddleware from "../../middlewares/validate.middleware";

const { validate } = validateMiddleware;

export class AuthRouter {
  public controller = controller;
  public router: Router = Router();

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router.post("/login", validate(AuthValidator.login), controller.login);
  }
}

export default new AuthRouter().router;
