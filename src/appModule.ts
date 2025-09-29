import { Pool } from 'pg';
import type { UserModule } from './modules/user/userModule.js';
import { appConfig } from './core/config/index.js';
import { createUserModule } from './modules/user/userModule.js';

export type AppContainer = UserModule & {};

export function createAppModule(): AppContainer {
  const db = new Pool({
    connectionString: appConfig.DATABASE_URL,
  });
  const telegramBot = new TelegramAdapter(appConfig.TELEGRAM_BOT_TOKEN);

  const userModule = createUserModule({
    db,
    telegram: telegramBot
  });

  telegramBot.start();

  return Object.assign(
    {},
    userModule,
  );
}
