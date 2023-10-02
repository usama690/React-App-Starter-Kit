import Joi from "joi";

export const register = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().required().email(),
        role: Joi.string().required(),
    }),
};

export const login = {
    body: Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().required().email(),
    }),
};
