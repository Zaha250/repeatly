import {Bot, webhookCallback, Context} from 'grammy';
import type {ITelegramService, TelegramCommandHandler} from './telegramService';
import {TelegramCommand} from './telegramService';

export class TelegramAdapter implements ITelegramService {
    private readonly bot: Bot;

    constructor(token: string) {
        this.bot = new Bot(token);
        console.log('🤖 Telegram бот инициализирован');
    }

    async sendMessage(chatId: number | string, msg: string): Promise<void> {
        await this.bot.api.sendMessage(chatId, msg);
    }

    command(command: TelegramCommand, handler: TelegramCommandHandler) {
        this.bot.command(command, async (ctx: Context) => {
            try {
                await handler(ctx);
            } catch (e) {
                console.error(`❌ Ошибка обработки команды /${TelegramCommand.Start}:`, e.message);
                await ctx.reply('Ой, что-то пошло не так. Попробуйте позже.');
            }
        });
    }

    public getWebhookMiddleware() {
        return webhookCallback(this.bot, 'express');
    }

    async start(): Promise<void> {
        await this.bot.start();
        console.log('🚀 Бот запущен в режиме polling');
    }
}
