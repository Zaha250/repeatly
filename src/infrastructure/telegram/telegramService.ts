export interface ITelegramService {
    sendMessage(chatId: number | string, msg: string): Promise<void>;
    command(command: TelegramCommand, handler: TelegramCommandHandler): void;
    start(): Promise<void>;
}

export type TelegramCommandHandler = (ctx: unknown) => Promise<void>;

export enum TelegramCommand {
    Start = 'start',
    Help = 'help',
    Settings = 'settings',
    Privacy = 'privacy',
    DeveloperInfo = 'developer_info',
}
