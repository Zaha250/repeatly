import express from 'express';
import {appConfig} from './core/config';
import {createAppModule} from './bootstrap/appModule';
import {configureRoutes} from './presentation/routes.js';
import {bootstrapTelegramRouter} from './presentation/telegramRouter';

(async () => {
    const app = express();
    app.use(express.json());

    const port = appConfig.PORT;

    const appModule = await createAppModule();

    bootstrapTelegramRouter(appModule);
    configureRoutes(app, appModule);

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
})();
