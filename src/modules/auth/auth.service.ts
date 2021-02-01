import User from "../user/user.model";

class AuthService {
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
