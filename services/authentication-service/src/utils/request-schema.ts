import { Joi } from 'express-validation';

export const registerValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        mobile: Joi.string().required(),
    }),
};

export const loginValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};
