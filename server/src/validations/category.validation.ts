import Joi from "joi";

export const categoryValidation = {
    body: Joi.object().keys({
        categoryName: Joi.string().required(),
    }),
};
