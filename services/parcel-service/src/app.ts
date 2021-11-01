import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import errorhandler from 'errorhandler';

const app = express();
app.set('port', process.env.PORT || 8081);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler());
}

app.get('/', (req, res) => res.send('Parcel Service!'));

export default app;
