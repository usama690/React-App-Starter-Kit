import httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";


export const getUserByEmail = async (email: string) => {
  return User.findOne({ email }).select("+password");
};


export const createUser = async (userBody: { [key: string]: any }) => {
  if (await User.isEmailTaken(userBody.email)) throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  const usr = await User.create(userBody);
  return usr.toObject();
};
