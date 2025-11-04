import {connectToMongo} from '../infrastructure/database/mongo/mongo';
import type {UserModule} from '../modules/user/userModule';
import {appConfig} from '../core/config';
import {createUserModule} from '../modules/user/userModule';
import {TelegramAdapter} from '../infrastructure/telegram/telegramAdapter';
import {TelegramNotificationAdapter} from '../infrastructure/telegram/telegramNotificationAdapter';
import {bootstrapTelegramRouter} from '../presentation/telegramRouter';
import {createWordModule, type WordModule} from '@src/modules/word/wordModule';

export type AppContainer = UserModule & WordModule;

export async function createAppModule(): Promise<AppContainer> {
    await connectToMongo();

    const telegramAdapter = new TelegramAdapter(appConfig.TELEGRAM_BOT_TOKEN);

    const notificationService = new TelegramNotificationAdapter(telegramAdapter);

    const userModule = createUserModule({
        notificationService,
    });
    const wordModule = createWordModule();

    bootstrapTelegramRouter(telegramAdapter, userModule.userController);

    telegramAdapter.start();

    return {
        ...userModule,
        ...wordModule
    };
}
