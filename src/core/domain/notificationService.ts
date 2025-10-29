export interface INotificationService {
    /**
     * Отправляет приветственное сообщение новому пользователю.
     * @param recipientId ID получателя (например, Telegram Chat ID).
     * @param message Имя пользователя для персонализации.
     */
    sendMessage(recipientId: number, message: string): Promise<void>;
}
