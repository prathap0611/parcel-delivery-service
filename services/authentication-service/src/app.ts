import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import errorhandler from 'errorhandler';
import { ValidationError } from 'express-validation';
import { buildRoutes } from './routes';
import logger from './utils/logger';
import { ClientAuthenticationError } from './utils/error';

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

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
    return res.status(500).send(err.message);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, _next) => {
    res.sendStatus(404);
});

export default app;
