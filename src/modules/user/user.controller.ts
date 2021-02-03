import UserService from "./user.service";
import CrudController from "../../common/controllers/crud.controller";

export class UserController extends CrudController {
  public service = UserService;
}

export default new UserController();
