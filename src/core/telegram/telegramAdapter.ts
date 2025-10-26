import {Bot, webhookCallback} from 'grammy';
import type {ITelegramService, TelegramCommandHandler} from './telegramServiceInterface.js';
import {TelegramCommand} from './telegramServiceInterface.js';

export class TelegramAdapter implements ITelegramService {
    readonly bot: Bot;

    constructor(token: string) {
        this.bot = new Bot(token);
        console.log('🤖 Telegram бот инициализирован');
    }

    async sendMessage(chatId: number | string, msg: string): Promise<void> {
        await this.bot.api.sendMessage(chatId, msg);
    }

    command(command: TelegramCommand, handler: TelegramCommandHandler) {
        this.bot.command(command, handler);
    }

    public getWebhookMiddleware() {
        return webhookCallback(this.bot, 'express');
    }

    async start(): Promise<void> {
        await this.bot.start();
        console.log('🚀 Бот запущен в режиме polling');
    }
}
