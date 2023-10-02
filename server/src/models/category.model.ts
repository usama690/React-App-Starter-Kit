import { model, Schema } from "mongoose";
import { ICategory } from "../interfaces";


const categorySchema = new Schema<ICategory>(
    {
        categoryName: { type: String, index: true, unique: true, required: true }
    },
    {
        timestamps: true,
    }
);

export default model<ICategory>('Category', categorySchema);
