import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { buildRoutes } from './routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

buildRoutes(app);

app.use(errorHandler);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, _next) => {
    res.sendStatus(404);
});

export default app;
