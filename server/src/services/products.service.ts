import { IProducts } from "../interfaces";
import Category from "../models/category.model";
import Product from "../models/products.model";

interface IPaginatedResults {
    products: IProducts[] | any,
    limit: number,
    page: number

}

export const createProduct = async (productBody: { [key: string]: any }) => {
    const prd = await Product.create(productBody);
    return prd.toObject();
};

export const matchProductCategory = async (_id: string) => {
    return Category.find({ _id })
};

export const updateProductByUserId = async (_id, productBody: { [key: string]: any }) => {
    return Product.updateOne({ _id }, { $set: productBody });
};


export const deleteProductByUserId = async (userId) => {
    return Product.deleteOne({ user: userId });
};


export const getPaginatedProducts = async (query, findQuery = null): Promise<IPaginatedResults> => {
    const page = query.page * 1 || 1;
    const limit = query.pageSize * 1 || 1;
    const skip = (page - 1) * limit;
    const products = await Product.find({ ...(findQuery && findQuery) }).populate("category")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    return { products, limit, page }

};
export const getPaginatedProductsCount = async (isQuery, findQuery = null): Promise<number> => {
    return Product.find({ ...(isQuery && findQuery) }).countDocuments()

};
