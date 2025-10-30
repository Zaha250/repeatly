import type {AppContainer} from '../bootstrap/appModule';
import {TelegramCommand} from '../infrastructure/telegram/telegramServiceInterface';

export function bootstrapTelegramRouter(container: AppContainer) {
    const {telegramAdapter, userController} = container;

    const bot = telegramAdapter.bot;

    bot.command(TelegramCommand.Start, async (ctx) => {
        try {
            if(!ctx.from) {
                throw new Error('Отсутствует информация о пользователе');
            }

            await userController.handleStart({
                chatId: ctx.chatId,
                from: {
                    id: ctx.from.id,
                    username: ctx.from.username ?? '',
                    first_name: ctx.from.first_name
                },
            });
        } catch (e) {
            console.error(`❌ Ошибка обработки команды /${TelegramCommand.Start}:`, e.message);
            await ctx.reply('Ой, что-то пошло не так. Попробуйте позже.');
        }
    });
}
