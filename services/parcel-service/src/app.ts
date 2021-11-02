import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import errorhandler from 'errorhandler';
import { buildRoutes } from './routes';
import { ValidationError } from 'express-validation';
import logger from './utils/logger';
import cors from 'cors';
import {
    ClientAuthenticationError,
    InvalidDeliveryRequest,
    ParcelAlreadyPickedForDelivery,
} from './utils/error';

const app = express();
app.set('port', process.env.PORT || 8081);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler());
}

buildRoutes(app);

app.use(function (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    logger.error(err);
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    if (err instanceof ClientAuthenticationError) {
        return res.status(403).send(err.message);
    }
    if (err instanceof ParcelAlreadyPickedForDelivery) {
        return res.status(409).send(err.message);
    }
    if (err instanceof InvalidDeliveryRequest) {
        return res.status(400).send(err.message);
    }
    return res.status(500).send(err.message);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, _next) => {
    res.sendStatus(404);
});

export default app;
