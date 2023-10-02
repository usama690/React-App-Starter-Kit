
import moment from 'moment'
import jwt from 'jsonwebtoken'
import Token from '../models/token.model';

export const generateToken = (userId, secret = process.env.JWT_SECRET) => {
    const payload = {
        sub: userId,
        iat: moment().unix()
    };
    return jwt.sign(payload, secret);
};

export const saveToken = async (token, userId) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
    });
    return tokenDoc;
};

export const generateAuthTokens = async user => {
    const accessToken = generateToken(user._id);
    await saveToken(accessToken, user._id);
    return accessToken;
};

export const removeToken = async user => {
    let res = await Token.findOneAndDelete({ user: user._id });
    return res;
  };
  