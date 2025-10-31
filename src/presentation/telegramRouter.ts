import type {AppContainer} from '../bootstrap/appModule';
import {TelegramCommand} from '../infrastructure/telegram/telegramService';

export function bootstrapTelegramRouter(container: AppContainer) {
    const {telegramService, userController} = container;

    telegramService.command(TelegramCommand.Start, async (ctx) => {
        const grammyCtx = ctx as {
            chatId?: number;
            from?: {id: number; username?: string; first_name?: string};
        };

        if (!grammyCtx.from || !grammyCtx.chatId) {
            throw new Error('Отсутствует информация о пользователе или чате');
        }

        await userController.handleStart({
            chatId: grammyCtx.chatId,
            from: {
                id: grammyCtx.from.id,
                username: grammyCtx.from.username ?? '',
                first_name: grammyCtx.from.first_name ?? '',
            },
        });
    });
}
