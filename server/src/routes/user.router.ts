import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../middlewares/auth';

class IndexRoute {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}/profile`).get(auth("profile"), this.userController.getReqUser);
  }
}

export default IndexRoute;
