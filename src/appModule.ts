import { Pool } from 'pg';
import type { UserModule } from './modules/user/userModule.js';
import { appConfig } from './core/config';
import { createUserModule } from './modules/user/userModule.js';
import { TelegramAdapter } from './core/telegram/telegramAdapter.js';
import { TelegramCommand } from './core/telegram/telegramServiceInterface';

export type AppContainer = UserModule & {};

const TEST_CHAT_ID = 883122075;

export function createAppModule(): AppContainer {
  const db = new Pool({
    connectionString: appConfig.DATABASE_URL,
  });
  const telegramBot = new TelegramAdapter(appConfig.TELEGRAM_BOT_TOKEN);

  const userModule = createUserModule({
    db,
    telegram: telegramBot
  });

  telegramBot.command(TelegramCommand.Start, (ctx) => {
    console.log('userInfo: ', ctx.from);
  })

  telegramBot.start();

  return Object.assign(
    {},
    userModule,
  );
}
