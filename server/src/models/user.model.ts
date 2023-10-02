import { Schema, model } from 'mongoose';
import { IUser, UserModel } from '../interfaces';
import bcrypt from "bcryptjs";


const userSchema = new Schema<IUser, UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false, required: true },
    avatar: {
      type: String,
      default: process.env.AVATAR_URL,
    },
    role: {
      type: String,
      default: 'CUSTOMER',
      enum: ['CUSTOMER', 'VENDOR', 'ADMIN'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

userSchema.statics.isEmailTaken = async function (
  email: string,
) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


export default model<IUser, UserModel>('User', userSchema);