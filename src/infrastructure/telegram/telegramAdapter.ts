import {Bot, webhookCallback, Context} from 'grammy';
import type {ITelegramService, TelegramCommandHandler} from './telegramService';
import {TelegramCommand} from './telegramService';
import type {ITelegramRouterAdapter, StartHandler} from '@src/presentation/routerInterface';
import type {HandleStartCommandRequestDto} from '@src/modules/user/presentation/dto/userDto';

export class TelegramAdapter implements ITelegramService, ITelegramRouterAdapter {
    private readonly bot: Bot;

    constructor(token: string) {
        this.bot = new Bot(token);
        console.log('🤖 Telegram бот инициализирован');
    }

    /**
     * Отправка сообщений
     * */
    async sendMessage(chatId: number | string, msg: string): Promise<void> {
        await this.bot.api.sendMessage(chatId, msg);
    }

    /**
     * Обработка команд телеграм бота
     * */
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

    /**
     * Обработка команды /start
     * */
    public onStart(handler: StartHandler): void {
        this.bot.command(TelegramCommand.Start, async (ctx) => {
            try {
                const {from, chatId} = ctx;
                if (!from || !chatId) {
                    throw new Error('Отсутствует информация о пользователе или чате');
                }

                const dto: HandleStartCommandRequestDto = {
                    chatId: chatId,
                    from: {
                        id: from.id,
                        username: from.username ?? '',
                        first_name: from.first_name ?? '',
                    },
                };

                await handler(dto);
            } catch (e) {
                console.error(
                    `❌ Ошибка обработки команды /${TelegramCommand.Start}:`,
                    (e as Error).message
                );
                await ctx.reply('Ой, что-то пошло не так. Попробуйте позже.');
            }
        });
    }
}
