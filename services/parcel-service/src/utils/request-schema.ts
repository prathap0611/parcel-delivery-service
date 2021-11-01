import { Joi } from 'express-validation';

export const createParcelValidation = {
    body: Joi.object({
        pickupAddress: Joi.string().required(),
        deliveryAddress: Joi.string().required(),
    }),
};

export const getParcelValidation = {
    params: Joi.object({
        parcelId: Joi.number().required(),
    }),
};

export const listParcelsValidation = {
    query: Joi.object({
        senderId: Joi.number().optional(),
    }),
};

export const pickupParcelValidation = {
    body: Joi.object({
        bikerId: Joi.number().required(),
        pickupTime: Joi.date().required(),
    }),
    params: Joi.object({
        parcelId: Joi.number().required(),
    }),
};

export const deliverParcelValidation = {
    body: Joi.object({
        bikerId: Joi.number().required(),
        deliveryTime: Joi.date().required(),
    }),
    params: Joi.object({
        parcelId: Joi.number().required(),
    }),
};
