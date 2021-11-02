import { Router, Request, Response, NextFunction } from 'express';
import { validate } from 'express-validation';

import {
    register,
    login,
    getProfile,
} from '../controllers/biker-authentication.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { loginValidation, registerValidation } from '../utils/request-schema';

export function buildBikerAuthenticationRoutes(): Router {
    const route = Router();

    route.post(
        '/register',
        validate(registerValidation),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const registerDetails = {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: req.body.password,
                };
                const token = await register(registerDetails);
                res.status(200).json(token);
            } catch (error) {
                next(error);
            }
        }
    );

    route.post(
        '/login',
        validate(loginValidation),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const loginDetails = {
                    email: req.body.email,
                    password: req.body.password,
                };
                const token = await login(loginDetails);
                res.status(200).json(token);
            } catch (error) {
                next(error);
            }
        }
    );

    route.get(
        '/profile',
        authenticationMiddleware,
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const profile = await getProfile(Number(res.locals.user.id));
                res.status(200).json(profile);
            } catch (error) {
                next(error);
            }
        }
    );

    return route;
}
