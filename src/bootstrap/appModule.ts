import {connectToMongo} from '../infrastructure/database/mongo';
import type {UserModule} from '../modules/user/userModule';
import {appConfig} from '../core/config';
import {createUserModule} from '../modules/user/userModule';
import {TelegramAdapter} from '../infrastructure/telegram/telegramAdapter';
import {TelegramNotificationAdapter} from '../infrastructure/telegram/telegramNotificationAdapter';
import {bootstrapTelegramRouter} from '../presentation/telegramRouter';

export type AppContainer = UserModule;

export async function createAppModule(): Promise<AppContainer> {
    await connectToMongo();

    const telegramAdapter = new TelegramAdapter(appConfig.TELEGRAM_BOT_TOKEN);

    const notificationService = new TelegramNotificationAdapter(telegramAdapter);

    const userModule = createUserModule({
        notificationService,
    });

    bootstrapTelegramRouter(telegramAdapter, userModule.userController);

    telegramAdapter.start();

    return {
        ...userModule,
    };
}
