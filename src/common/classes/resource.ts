import { Router } from "express";
import CrudController from "../controllers/crud.controller";
import Middleware from "../interfaces/middlewares.interface";

export class Resource {
  /**
   * Create resource with defaults controller functions
   *
   * @param router
   * @param controller
   * @param except
   */
  public static create(
    router: Router,
    controller: CrudController,
    except: string[] = [],
    middlewares: Middleware = {}
  ): Router {
    if (!except.includes("store"))
      router.post("/", [...(middlewares.store || [])], controller.store);

    if (!except.includes("index"))
      router.get("/", [...(middlewares.index || [])], controller.index);

    if (!except.includes("get"))
      router.get("/:id", [...(middlewares.get || [])], controller.get);

    if (!except.includes("update"))
      router.put("/:id", [...(middlewares.update || [])], controller.update);

    if (!except.includes("delete"))
      router.delete("/:id", [...(middlewares.delete || [])], controller.delete);

    return router;
  }
}
