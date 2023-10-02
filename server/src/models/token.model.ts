import { model, Schema } from "mongoose";
import { IToken } from "../interfaces";


const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IToken>('Token', tokenSchema);
