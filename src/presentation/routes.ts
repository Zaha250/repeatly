import type {Express} from 'express';
import type {AppContainer} from '../appModule.js';

export function configureRoutes(app: Express, _container: AppContainer): void {
    app.get('/api/health', (req, res) => {
        res.status(200).send('OK');
    });
}
