import express from 'express';
import {appConfig} from './core/config';
import {createAppModule} from './bootstrap/appModule';
import {configureRoutes} from './presentation/routes.js';
import {errorMiddleware} from './presentation/errors/errorMiddleware';

(async () => {
    const app = express();
    app.use(express.json());

    const port = appConfig.PORT;

    const appModule = await createAppModule();

    configureRoutes(app, appModule);

    app.use(errorMiddleware);

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
})();
