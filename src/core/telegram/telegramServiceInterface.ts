import type { CommandMiddleware } from 'grammy';
import { Context } from 'grammy';

export interface ITelegramService {
    sendMessage(chatId: number, msg: string): Promise<void>;
    command(command: TelegramCommand, handler: TelegramCommandHandler): void;
    start(): Promise<void>;
}

export type TelegramCommandHandler = CommandMiddleware<Context>;

export enum TelegramCommand {
    Start = 'start',
    Help = 'help',
    Settings = 'settings',
    Privacy = 'privacy',
    Developer_info = 'developer_info',
}
