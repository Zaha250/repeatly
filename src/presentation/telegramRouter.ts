import type { AppContainer } from '../appModule';
import { TelegramCommand } from '../core/telegram/telegramServiceInterface';

export function bootstrapTelegramRouter(container: AppContainer) {
  const {
    telegramAdapter,
    userController
  } = container;

  const bot = telegramAdapter.bot;

  bot.command(TelegramCommand.Start, async (ctx) => {
    try {
      await userController.handleStart({
        body: {
          chatId: ctx.chatId,
          from: ctx.from
        }
      } as any);
    } catch (e) {
      console.warn(`Ошибка обработки команды /${TelegramCommand.Start}: `, e.message);
      await ctx.reply('Ой, что-то пошло не так. Попробуйте позже.');
    }
  });
}