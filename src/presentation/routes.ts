import type {Express} from 'express';
import type {AppContainer} from '../bootstrap/appModule';

export function configureRoutes(app: Express, container: AppContainer): void {
    const {userController} = container;

    app.get('/api/health', (req, res) => {
        res.status(200).send('OK');
    });
    app.get('/api/users', userController.getUserList);
}
