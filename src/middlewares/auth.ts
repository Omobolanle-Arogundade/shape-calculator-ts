import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { envs } from "../../config/envs";
import logger from "../../config/logger";
import HttpController from "../common/controllers/http.controller";
import User from "../modules/user/user.model";

export class AuthMiddleware extends HttpController {
  public secretKey: string = envs.jwt.secret || "";

  /**
   *
   * @param req
   */
  public getTokenFromRequest(req: Request): string | null {
    let authorization = req.header("authorization");
    let token = authorization ? authorization.split(" ") : [];
    return token.length ? token[1] : null;
  }

  /**
   *
   * @param req
   */
  public getAuthUser = async (req: Request): Promise<User | null> => {
    const token = this.getToken(req);
    return await this.getAuthUserByToken(token);
  };

  /**
   *
   * @param token
   */
  public getAuthUserByToken = async (token: string): Promise<User | null> => {
    const decoded: any = verify(token, this.secretKey);

    if (decoded.exp <= Date.now())
      throw new Error("Access Denied, Authentication Required");

    return await User.findOne({ where: { email: decoded.email } });
  };

  /**
   *
   * @param req
   */
  public getToken = (req: Request): string => {
    const token = this.getTokenFromRequest(req);
    if (!token) throw new Error("Token is required");

    return token;
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public verifyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const authUser = await this.getAuthUser(req);

      if (authUser) {
        res.locals = { authUser };
        return next();
      } else {
        return this.returnUnauthorized(res);
      }
    } catch (err) {
      return this.returnUnauthorized(res, err.message);
    }
  };
}

export default new AuthMiddleware();
