import { Router, Request, Response, NextFunction } from 'express';
import { validate } from 'express-validation';

import {
    createParcel,
    pickupParcel,
    listParcels,
    getParcel,
    deliverParcel,
} from '../controller/parcel-controller';
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import {
    createParcelValidation,
    deliverParcelValidation,
    getParcelValidation,
    listParcelsValidation,
    pickupParcelValidation,
} from '../utils/request-schema';

export function buildParcelRoutes(): Router {
    const route = Router();

    route.post(
        '/',
        authenticationMiddleware,
        validate(createParcelValidation),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parcelId = await createParcel({
                    senderId: res.locals.user.id,
                    pickupAddress: req.body.pickupAddress,
                    deliveryAddress: req.body.deliveryAddress,
                });
                res.status(201).json(parcelId);
            } catch (error) {
                next(error);
            }
        }
    );

    route.get(
        '/:parcelId',
        authenticationMiddleware,
        validate(getParcelValidation),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parcel = await getParcel(Number(req.params.parcelId));
                res.status(200).json(parcel);
            } catch (error) {
                next(error);
            }
        }
    );

    route.get(
        '/',
        authenticationMiddleware,
        validate(listParcelsValidation),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parcels = await listParcels(Number(req.query.senderId));
                res.status(200).json(parcels);
            } catch (error) {
                next(error);
            }
        }
    );

    route.patch(
        '/:parcelId',
        authenticationMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
            if (req.body.pickupTime) {
                validate(pickupParcelValidation)(req, res, next);
            } else {
                validate(deliverParcelValidation)(req, res, next);
            }
        },
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (req.body.pickupTime) {
                    const status = await pickupParcel({
                        bikerId: Number(req.body.bikerId),
                        pickupTime: req.body.pickupTime,
                        parcelId: Number(req.params.parcelId),
                    });
                    res.status(200).send(status);
                } else {
                    const status = await deliverParcel({
                        bikerId: Number(req.body.bikerId),
                        deliveryTime: req.body.deliveryTime,
                        parcelId: Number(req.params.parcelId),
                    });
                    res.status(200).send(status);
                }
            } catch (error) {
                next(error);
            }
        }
    );

    return route;
}
