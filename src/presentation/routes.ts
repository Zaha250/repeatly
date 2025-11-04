import {type Express, Router} from 'express';
import type {AppContainer} from '../bootstrap/appModule';

export function configureRoutes(app: Express, container: AppContainer): void {
    const {userController, wordController} = container;

    const router = Router();

    app.use('/api', router);

    router.get('/health', (req, res) => {
        res.status(200).send('OK');
    });

    /* Users */
    router.get('/user', userController.getUserList);

    /* Words */
    router.use('/word', wordController.addWord);
}
