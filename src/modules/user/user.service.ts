import User from "./user.model";
import { CrudService } from "../../common/services/crud.service";

class UserService extends CrudService {
  public model = User;
  public modelName = "User";
}

export default new UserService();
