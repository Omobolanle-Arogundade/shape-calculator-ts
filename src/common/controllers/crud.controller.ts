import { Request, Response } from "express";
import { PaginateOptions } from "../interfaces/paginate-options.interface";
import { CrudService } from "../services/crud.service";
import HttpController from "./http.controller";

export default abstract class CrudController extends HttpController {
  abstract service: CrudService;

  private _defaultFindOptions: PaginateOptions = {
    limit: 15,
    page: 1,
    order: "ASC",
    sort: "id"
  };

  public get defaultFindOptions(): PaginateOptions {
    return this._defaultFindOptions;
  }

  public set defaultFindOptions(options: PaginateOptions) {
    this._defaultFindOptions = { ...this._defaultFindOptions, ...options };
  }

  /**
   * get method
   *
   * @param req
   * @param res
   */
  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = +req.params.id;
      const data = await this.service.get(id);
      if (!data)
        return this.returnBadRequest(
          res,
          `ID for ${this.service.modelName} is invalid!`
        );
      return this.returnData(res, data);
    } catch (err) {
      return this.processException(res, err);
    }
  };

  /**
   * list all method
   *
   * @param req
   * @param res
   */
  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.query.list)
        return this.returnData(res, await this.service.list());
      const options = await this.buildOptions(req.query);
      return this.returnData(res, await this.service.all(options));
    } catch (err) {
      return this.processException(res, err);
    }
  };
  /**
   * store method
   *
   * @param req
   * @param res
   */
  public store = async (req: any, res: any): Promise<Response> => {
    try {
      const created = await this.service.create(req.body);
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
      return this.processException(res, err);
    }
  };

  /**
   * update method
   *
   * @param req
   * @param res
   */
  public update = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id;
    const data = await this.service.get(id);
    if (!data)
      return this.returnNotFound(
        res,
        `ID for ${this.service.modelName} is invalid!`
      );

    try {
      const newData = (await this.service.update(req.body, id))[1][0];
      if (newData)
        return this.return(
          res,
          newData,
          `${this.service.modelName} updated successfully!`
        );

      return this.returnServerError(
        res,
        `Error updating ${this.service.modelName}.`
      );
    } catch (err) {
      return this.processException(res, err);
    }
  };
  /**
   * delete method
   *
   * @param req
   * @param res
   */
  public delete = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id;
    if (!id)
      return this.returnNotFound(
        res,
        `ID for ${this.service.modelName} is invalid!`
      );

    try {
      if (await this.service.delete(id))
        return this.returnMessage(
          res,
          `${this.service.modelName} deleted successfully!`
        );

      return this.returnBadRequest(
        res,
        `Error deleting ${this.service.modelName}`
      );
    } catch (err) {
      return await this.processException(res, err);
    }
  };

  /**
   *
   * @param query
   */
  public buildOptions = async (query: any): Promise<{}> => {
    //clean query options
    for (let key in query) {
      if (query[key] === "") delete query[key];
    }

    //merge default options
    query = { ...this.defaultFindOptions, ...query };

    if (!["ASC", "DESC"].includes(query.order)) {
      query.order = "ASC";
    }

    if (!Object.keys(this.service.model.rawAttributes).includes(query.sort)) {
      query.sort = "id";
    }

    return query;
  };
}
