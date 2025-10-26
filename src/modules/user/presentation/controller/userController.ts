import type {Request} from 'express';
import type {HandleStartCommandUseCase} from '../../application/useCase/handleStartCommandUseCase';

export class UsersController {
    constructor(private readonly handleStartCommand: HandleStartCommandUseCase) {}

    // Обработчик команды /start
    async handleStart(req: Request) {
        const body = req.body as any;
        if (!body?.from) {
            throw new Error('Некорректные данные пользователя');
        }
        if (!body?.chatId) {
            throw new Error('Отсутствует chatId');
        }

        await this.handleStartCommand.execute({
            chatId: body.chatId,
            user: {
                id: body.from.id,
                firstName: body.from.first_name,
                username: body.from.username,
            },
        });
    }
}
