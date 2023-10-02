import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import { login, register } from '../validations/auth.validation';
import auth from '../middlewares/auth';
import fileUpload from '../middlewares/fileUpload';

class AuthRoute {
    public path = '/auth';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route(`${this.path}/login`).post(validate(login), this.authController.login);
        this.router.route(`${this.path}/register`).post(fileUpload.single("profile_img"), validate(register), this.authController.register);
        this.router.route(`${this.path}/logout`).post(auth("logout"), this.authController.logout);
    }
}

export default AuthRoute;
