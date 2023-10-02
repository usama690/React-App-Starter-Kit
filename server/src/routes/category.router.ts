import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';
import { categoryValidation } from '../validations/category.validation';

class CategoryRoute {
    public path = '/category';
    public router = Router();
    public categoryController = new CategoryController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(auth("categories"))

        this.router.route(this.path)
            .post(validate(categoryValidation), this.categoryController.addCategory)
            .get(this.categoryController.getCategories)


        this.router.route(`${this.path}/:id`)
            .delete(this.categoryController.deleteCategory)
            .put(validate(categoryValidation), this.categoryController.updateCategory);
    }
}

export default CategoryRoute;
