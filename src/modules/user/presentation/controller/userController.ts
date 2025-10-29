import type {HandleStartCommandUseCase} from '../../application/useCase/handleStartCommandUseCase';
import type {HandleStartCommandRequestDto} from '../dto/userDto';

export class UsersController {
    constructor(private readonly handleStartCommand: HandleStartCommandUseCase) {}

    // Обработчик команды /start
    async handleStart(body: HandleStartCommandRequestDto) {
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
