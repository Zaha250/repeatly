import {connectToMongo} from './core/database/mongo';
import type {UserModule} from './modules/user/userModule.js';
import {appConfig} from './core/config';
import {createUserModule} from './modules/user/userModule.js';
import {TelegramAdapter} from './core/telegram/telegramAdapter.js';

export type AppContainer = UserModule & {
    telegramAdapter: TelegramAdapter;
};

const TEST_CHAT_ID = 883122075;

export async function createAppModule(): AppContainer {
    await connectToMongo();

    const telegramAdapter = new TelegramAdapter(appConfig.TELEGRAM_BOT_TOKEN);

    const userModule = createUserModule({
        telegram: telegramAdapter,
    });

    telegramAdapter.start();

    return {
        ...userModule,
        telegramAdapter,
    };
}
