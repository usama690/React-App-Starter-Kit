import * as httpStatus from "http-status";
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { createUser, getUserByEmail } from '../services/user.service';
import { generateAuthTokens, removeToken } from "../services/token.service";
import { IReqFile } from "../interfaces";
import { getImageUrl } from "../services/global.service";

class AuthController {

    public login = catchAsync(
        async (req: Request, res: Response): Promise<any> => {
            const { email, password } = req.body;
            const user = await getUserByEmail(email);
            if (!user) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Invalid credentials" });
            const isPasswordMatch = await user.isPasswordMatch(password);
            if (!isPasswordMatch) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Invalid credentials" });
            const token = await generateAuthTokens(user);
            res.status(httpStatus.OK).send({ message: "login successful", user, token });
        }
    )

    public register = catchAsync(
        async (req: IReqFile, res: Response): Promise<any> => {
            if (!req.file?.path) return res.status(httpStatus.NOT_ACCEPTABLE).send({ message: "Profile image is required" });
            const imageUrl = await getImageUrl(req.file.path)
            req.body.avatar = imageUrl
            await createUser(req.body);
            res
                .status(httpStatus.OK)
                .send({ message: "user created successfully" });
        }
    )

    public logout = catchAsync(async (req, res) => {
        const user = req.user;
        await removeToken(user);
        return res.status(httpStatus.OK).send({
            message: "logout successful",
            status: true,
        });
    });


}

export default AuthController;
