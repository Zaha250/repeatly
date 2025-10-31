import type {INotificationService} from '../../domain/notificationService';
import type {ITelegramService} from './telegramService';

/**
 * Адаптер, который реализует доменную потребность
 * (INotificationService) с помощью технической реализации (ITelegramService).
 */
export class TelegramNotificationAdapter implements INotificationService {
    constructor(private readonly telegramService: ITelegramService) {}

    async sendMessage(recipientId: number, message: string): Promise<void> {
        await this.telegramService.sendMessage(recipientId, message);
    }
}
