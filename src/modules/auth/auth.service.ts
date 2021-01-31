import HttpController from "../../common/controllers/http.controller";
import User from "../user/user.model";
const { APP_SECRET_KEY } = process.env;

class AuthService {
  public secretKey: string = APP_SECRET_KEY || "";

  /**
   *
   * @param email
   * @param scope
   */
  public async findUserByEmail(
    email: string,
    scope: string = "full"
  ): Promise<User | null> {
    const user = await User.scope(scope).findOne({
      where: { email }
    });
    return user;
  }
}

export default new AuthService();
