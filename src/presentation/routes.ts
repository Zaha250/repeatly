import type {Express} from 'express';
import type {AppContainer} from '../bootstrap/appModule';

export function configureRoutes(app: Express, container: AppContainer): void {
    const {userController, wordController} = container;

    app.get('/api/health', (req, res) => {
        res.status(200).send('OK');
    });

    /* Users */
    app.get('/api/users', userController.getUserList);

    /* Words */
    app.use('/api/word', wordController.addWord);
}
