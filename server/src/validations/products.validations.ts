import Joi from "joi";

export const addProduct = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        price: Joi.string().required(),
        category: Joi.string().required(),
    }),
};

export const productParamsValidation = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
