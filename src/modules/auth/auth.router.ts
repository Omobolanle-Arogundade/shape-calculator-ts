import controller from "./auth.controller";
import { Router } from "express";

export class AuthRouter {
  public controller = controller;
  public router: Router = Router();

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router.post("/login", controller.login);
  }
}

export default new AuthRouter().router;
