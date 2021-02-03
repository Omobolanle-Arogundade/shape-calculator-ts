import { Router } from "express";
import CrudController from "../controllers/crud.controller";
import Middleware from "../interfaces/middlewares.interface";
import { Resource } from "./resource";

export abstract class CrudRoute {
  abstract router: Router;
  abstract controller: CrudController;
  public exceptRoutes?: string[] = [];
  public createResource?: boolean = true;
  public middlewares?: Middleware = {};

  public init(): void {
    if (this.createResource) {
      Resource.create(
        this.router,
        this.controller,
        this.exceptRoutes,
        this.middlewares
      );
    }
  }
}
