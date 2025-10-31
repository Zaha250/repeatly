import type {HandleStartCommandUseCase} from '../../application/useCase/handleStartCommandUseCase';
import type {HandleStartCommandRequestDto} from '../dto/userDto';

export class UsersController {
    constructor(private readonly handleStartCommand: HandleStartCommandUseCase) {}

    // Обработчик команды /start
    handleStart = async (dto: HandleStartCommandRequestDto) => {
        if (!dto?.from) {
            throw new Error('Некорректные данные пользователя');
        }
        if (!dto?.chatId) {
            throw new Error('Отсутствует chatId');
        }

        await this.handleStartCommand.execute({
            chatId: dto.chatId,
            user: {
                id: dto.from.id,
                firstName: dto.from.first_name,
                username: dto.from.username,
            },
        });
    };
}
