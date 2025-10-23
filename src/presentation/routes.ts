import type { Express } from 'express';
import type { AppContainer } from '../appModule.js';
import { TelegramCommand } from '../core/telegram/telegramServiceInterface';

export function configureRoutes(app: Express, container: AppContainer): void {
  const {
    telegramAdapter,
    userController
  } = container;

  telegramAdapter.command(TelegramCommand.Start, async (ctx) => {
    try {
      await userController.handleStart({
        body: {
          chatId: ctx.chatId,
          from: ctx.from
        }
      } as any);
    } catch (e) {
      if(ctx.chatId) {
        await telegramAdapter.sendMessage(ctx.chatId, e.message);
      } else {
        console.warn('Ошибка обработки команды /start: ', e.message);
      }
    }
  });
}