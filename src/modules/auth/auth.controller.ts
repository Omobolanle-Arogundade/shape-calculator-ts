import { Request, Response } from "express";
import { compare } from "bcryptjs";

import HttpController from "../../common/controllers/http.controller";
import User from "../user/user.model";
import TokenService from "../../common/services/token.service";
import AuthService from "./auth.service";

export class AuthController extends HttpController {
  private service = AuthService;
  private tokenService = TokenService;

  public login = async (req: Request, res: Response): Promise<Response> => {
    let messageError = "User credentials is incorrect!";
    try {
      const { email, password } = req.body;

      const user = await this.service.findUserByEmail(email, "withPassword");
      if (!user) return this.returnUnauthorized(res, messageError);

      const match = await compare(password.toString(), user.password);
      if (!match) return this.returnUnauthorized(res, messageError);

      const tokens = await this.tokenService.generateAuthTokens(email);

      return this.returnData(res, {
        user: await User.findOne({
          where: { email }
        }),
        tokens
      });
    } catch (err) {
      return this.returnServerError(res, err.message, err.stack);
    }
  };
}

export default new AuthController();
