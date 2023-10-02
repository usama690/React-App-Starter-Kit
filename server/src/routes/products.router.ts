import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import fileUpload from '../middlewares/fileUpload';
import validate from '../middlewares/validate';
import { addProduct, productParamsValidation } from '../validations/products.validations';
import auth from '../middlewares/auth';

class ProductsRoute {
    public path = '/products';
    public router = Router();
    public productsController = new ProductsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route(this.path).post(auth("addProduct"), fileUpload.single("product_img"), validate(addProduct), this.productsController.addProduct);
        this.router.route(this.path).get(auth("getSearchProducts"), this.productsController.getSearchProducts);
        this.router.route(`${this.path}/user`).get(auth("getUserProducts"), this.productsController.getUserProducts);
        this.router.route(`${this.path}/all`).get(auth("getAllProducts"), this.productsController.getProducts);
        this.router.route(`${this.path}/:id`)
            .put(auth("updateProduct"), fileUpload.single("product_img"), validate(productParamsValidation), this.productsController.updateProduct)
            .delete(auth("deleteProduct"), this.productsController.deleteUserProduct);
    }
}

export default ProductsRoute;
