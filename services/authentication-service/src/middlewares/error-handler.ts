import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { HttpException } from '../utils/error';
import { ValidationError } from 'express-validation';

export function errorHandler(
    err: HttpException,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void {
    logger.error(err.message);
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json(err);
    } else {
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.status(status).send({
            status,
            message,
        });
    }
}
