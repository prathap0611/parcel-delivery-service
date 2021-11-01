import { Application } from 'express';
import { buildSenderAuthenticationRoutes } from './sender-authentication.routes';
import { buildBikerAuthenticationRoutes } from './biker-authentication.routes';

export function buildRoutes(app: Application): void {
    app.use('/senders', buildSenderAuthenticationRoutes());
    app.use('/bikers', buildBikerAuthenticationRoutes());
}
