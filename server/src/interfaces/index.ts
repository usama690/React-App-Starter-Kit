import { Request, Router } from 'express';
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar?: string;
  role: string;
  isPasswordMatch: (password: string) => Promise<boolean>;
}
export interface IToken extends Document {
  token: string;
  user: Schema.Types.ObjectId;
  expires?: Date;
}

export interface UserModel extends Model<IUser> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
}

export interface IReqUser extends Request {
  user: { [key: string]: any }
}

export interface IReqFile extends Request {
  file: { [key: string]: any }
  user?: { [key: string]: any }
}

export interface UserRequest extends Request {
  user: IUser;
}

export interface IjwtPayLoad {
  id?: string;
}

export interface Routes {
  path?: string;
  router: Router;
}

export interface IProducts extends Document {
  title: string;
  desc: string;
  imgSrc: string;
  price: string;
  category: { [key: string]: any };
  user: string | { [key: string]: any }
}

export interface ISearch {
  query: {
    isCategory?: string
    keyword?: string
  }
}

export interface ICategory extends Document {
  categoryName: string;
}