import express from "express";
import { appConfig } from './core/config';
import { createAppModule } from './appModule.js';
import { configureRoutes } from './presentation/routes.js';

const app = express();
app.use(express.json());

const port = appConfig.PORT;

const appModule = createAppModule();

configureRoutes(app, appModule);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});