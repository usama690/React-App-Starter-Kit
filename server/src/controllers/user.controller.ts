import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { getUserByEmail } from '../services/user.service';
import httpStatus from 'http-status';
import { IReqUser } from '../interfaces';

class UserController {


  public getReqUser = catchAsync(async (req: IReqUser, res: Response): Promise<any> => {
    const user = await getUserByEmail(req.user.email);
    user.password = undefined
    if (!user) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
    return res.status(httpStatus.OK).send({ message: "User get successfully", user });
  })
}

export default UserController;
