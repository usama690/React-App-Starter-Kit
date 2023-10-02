import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { createProduct, deleteProductByUserId, getPaginatedProducts, getPaginatedProductsCount, matchProductCategory, updateProductByUserId } from '../services/products.service';
import httpStatus from 'http-status';
import { IReqFile, IReqUser, ISearch } from '../interfaces';
import { getImageUrl } from '../services/global.service';

class ProductsController {

    public addProduct = catchAsync(async (req: IReqFile, res: Response): Promise<any> => {
        if (!req.file?.path) return res.status(httpStatus.NOT_ACCEPTABLE).send({ message: "Profile image is required" });
        const isMatchCategory = await matchProductCategory(req.body.category)
        if (!isMatchCategory) return res.status(httpStatus.NOT_ACCEPTABLE).send({ message: "Category not matched" });
        const imageUrl = await getImageUrl(req.file.path)
        req.body.imgSrc = imageUrl
        req.body.user = req.user._id
        await createProduct(req.body)
        return res.status(httpStatus.OK).json({ message: 'Successfully added the product' });
    })

    public updateProduct = catchAsync(async (req: IReqFile, res: Response): Promise<any> => {
        if (req?.file?.path) {
            const imageUrl = await getImageUrl(req.file.path)
            req.body.imgSrc = imageUrl
        }
        await updateProductByUserId(req.params.id, req.body)
        return res.status(httpStatus.OK).json({ message: 'Successfully updated the product' });
    })


    public getUserProducts = catchAsync(async (req: IReqUser, res: Response): Promise<any> => {
        const query = req.query
        const findQuery = { user: req.user._id }
        const { products, limit } = await getPaginatedProducts(query, findQuery)
        if (!products.length) return res.status(httpStatus.NOT_FOUND).send({ message: "No products found" });
        const count = await getPaginatedProductsCount(true, findQuery)
        let numOfPages = Math.ceil(count / limit);
        return res.status(httpStatus.OK).json({
            message: 'Successfully get the products',
            products,
            metaData: {
                count,
                numOfPages
            }
        });
    })

    public getProducts = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const query = req.query
        const { products, limit } = await getPaginatedProducts(query)
        if (!products.length) return res.status(httpStatus.NOT_FOUND).send({ message: "No product found" });
        const count = await getPaginatedProductsCount(false)
        let numOfPages = Math.ceil(count / limit);

        return res.status(httpStatus.OK).json({
            message: 'Successfully get the products',
            products,
            metaData: {
                count,
                numOfPages
            }
        });
    })

    public getSearchProducts = catchAsync(async (req: ISearch, res: Response): Promise<any> => {
        const query = { page: 1, pageSize: 20 }
        const r1 = new RegExp(`\\b${req.query.keyword}`, 'i');
        let findQuery;
        if (JSON.parse(req.query.isCategory)) findQuery = { category: req.query.keyword }
        else findQuery = { title: { $regex: r1 } }
        const { products, limit } = await getPaginatedProducts(query, findQuery)
        if (!products.length) return res.status(httpStatus.NOT_FOUND).send({ message: "No product found" });
        const count = await getPaginatedProductsCount(true, findQuery)
        let numOfPages = Math.ceil(count / limit);

        return res.status(httpStatus.OK).json({
            message: 'Successfully get the products',
            products,
            metaData: {
                count,
                numOfPages
            }
        });
    })

    public deleteUserProduct = catchAsync(async (req: IReqUser, res: Response): Promise<any> => {
        await deleteProductByUserId(req.user._id)
        return res.status(httpStatus.OK).json({ message: 'Successfully deleted the product' });
    })
}

export default ProductsController;
