import { Request, Response } from 'express';
import { createCategories, deleteCategoryById, getAllCategories, updateCategoryById } from '../services/category.service';
import httpStatus from 'http-status';

class CategoryController {
    public addCategory = async (req: Request, res: Response): Promise<any> => {
        await createCategories(req.body.categoryName)
        return res.status(httpStatus.OK).json({ message: 'Category added successfully' });
    };

    public updateCategory = async (req: Request, res: Response): Promise<any> => {
        await updateCategoryById(req.params.id, req.body)
        return res.status(httpStatus.OK).json({ message: 'Category updated successfully' });
    };

    public getCategories = async (req: Request, res: Response): Promise<any> => {
        const categories = await getAllCategories()
        if (!categories.length) return res.status(httpStatus.NOT_FOUND).json({ message: 'No category found' });
        return res.status(httpStatus.OK).json({ message: 'Categories get successfully', categories });
    };

    public deleteCategory = async (req: Request, res: Response): Promise<any> => {
        await deleteCategoryById(req.params.id)
        return res.status(httpStatus.OK).json({ message: 'Category deleted successfully' });
    };

}

export default CategoryController;
