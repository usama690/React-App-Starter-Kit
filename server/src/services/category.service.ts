import Category from "../models/category.model";


export const createCategories = async (categoryName) => {
    await Category.create({ categoryName });
};

export const getAllCategories = async () => {
    return Category.find()
};

export const updateCategoryById = async (_id, productBody: { [key: string]: any }) => {
    return Category.updateOne({ _id }, { $set: productBody });
};

export const deleteCategoryById = async (_id) => {
    return Category.deleteOne({ _id });
};
