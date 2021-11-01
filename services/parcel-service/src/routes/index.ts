import { Application } from 'express';
import { buildParcelRoutes } from './parcel.routes';

export function buildRoutes(app: Application): void {
    app.use('/parcel', buildParcelRoutes());
}
