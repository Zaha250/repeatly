import express from "express";
import { appConfig } from './core/config/index.js';
import { createAppModule } from './appModule.js';
import { configureRoutes } from './presentation/routes.js';

const appModule = createAppModule();

const app = express();
app.use(express.json());

const port = appConfig.PORT;

configureRoutes(app, appModule);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});