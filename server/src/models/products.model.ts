import { Schema, model } from 'mongoose';
import { IProducts } from '../interfaces';


const productsSchema = new Schema<IProducts>(
    {
        title: { type: String, required: true, index: true },
        desc: { type: String, required: true, index: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        price: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        imgSrc:
        {
            type: String,
            default: process.env.AVATAR_URL,
        }
    },
    {
        timestamps: true,
    },
);


export default model<IProducts>('Products', productsSchema);