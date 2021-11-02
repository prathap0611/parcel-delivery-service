import { Joi } from 'express-validation';

const passwordValidator = (value: string, helper: any) => {
    // eslint-disable-next-line prefer-regex-literals
    const expToCheck = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.{8,})');
    if (!expToCheck.test(value)) {
        return helper.message(
            'Password should be a minimum of eight characters, should have at least one lower case and one number character'
        );
    } else {
        return true;
    }
};
export const registerValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(passwordValidator),
        mobile: Joi.string().required(),
    }),
};

export const loginValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(passwordValidator),
    }),
};

export const getProfileValidation = {
    query: Joi.object({
        email: Joi.string().email().required()
    }),
};
