import { NextFunction, Request, Response } from 'express';
import { ClientAuthenticationError } from '../utils/error';
import { verifyToken } from '../utils/authentication';
import logger from '../utils/logger';

export async function authenticationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const header = req.headers.authorization || '';
        const bearer = header.split(' ');
        const token = bearer[1];

        if (!token) {
            throw new Error('Bearer Token is empty');
        }

        const decodedValue = await verifyToken(
            token,
            process.env.USER_AUTH_SECRET as string
        );
        res.locals.user = decodedValue;

        next();
    } catch (error) {
        logger.error(error);
        next(
            new ClientAuthenticationError('Token is either expired or invalid')
        );
    }
}
