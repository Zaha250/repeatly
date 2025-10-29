import {connectToMongo} from './core/infrastructure/database/mongo';
import type {UserModule} from './modules/user/userModule.js';
import {appConfig} from './core/config';
import {createUserModule} from './modules/user/userModule.js';
import {TelegramAdapter} from './core/infrastructure/telegram/telegramAdapter.js';
import {TelegramNotificationAdapter} from './core/infrastructure/telegram/telegramNotificationAdapter';

export type AppContainer = UserModule & {
    telegramAdapter: TelegramAdapter;
};

export async function createAppModule(): Promise<AppContainer> {
    await connectToMongo();

    const telegramAdapter = new TelegramAdapter(appConfig.TELEGRAM_BOT_TOKEN);

    const notificationService = new TelegramNotificationAdapter(telegramAdapter);

    const userModule = createUserModule({
        notificationService,
    });

    telegramAdapter.start();

    return {
        ...userModule,
        telegramAdapter,
    };
}
