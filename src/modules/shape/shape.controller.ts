import { Request, Response } from "express";

import ShapeService from "./shape.service";
import CrudController from "../../common/controllers/crud.controller";

export class ShapeController extends CrudController {
  public service = ShapeService;

  public calculateArea = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let messageError = "Error calculating area!";
    try {
      const { shape, dimensions } = req.body;
      const {
        authUser: { id: uid }
      } = res.locals;

      const area = this.service.calculateArea(shape, dimensions);
      if (!area) return this.returnServerError(res, messageError);

      const created = await this.service.storeShapes(shape, area, uid);
      if (created)
        return this.returnCreated(
          res,
          created,
          `${this.service.modelName} created successfully!`
        );

      return this.returnBadRequest(
        res,
        `Error creating ${this.service.modelName}`
      );
    } catch (err) {
      return this.returnServerError(res, err.message, err.stack);
    }
  };
}

export default new ShapeController();
