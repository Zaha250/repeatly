import type { Express } from 'express';
import type { AppContainer } from '../appModule.js';

export function configureRoutes(app: Express, container: AppContainer): void {
  app.get('/', (req, res) => {
    res.send('Че там')
  });
}