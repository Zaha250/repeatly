import type {CreateUserDto, IUserRepository} from '../../domain/repository/userRepository';
import type {ITelegramService} from '../../../../core/telegram/telegramServiceInterface';
import {UserAlreadyExistsError} from '../../domain/error/userErrors';

export interface HandleStartCommandDto {
    chatId: number;
    user: {
        id: number;
        username: string;
        firstName: string;
    };
}

export class HandleStartCommandUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly telegramService: ITelegramService
    ) {}

    async execute(dto: HandleStartCommandDto): Promise<void> {
        try {
            const userData: CreateUserDto = {
                tgId: dto.user.id,
                firstName: dto.user.firstName,
                username: dto.user.username,
            };

            const existUser = await this.userRepository.findByTgId(userData.tgId);

            if (!existUser) {
                await this.userRepository.create(userData);
            }

            // Отправляем приветственное сообщение
            // Используем parse_mode Markdown, чтобы звездочки сработали
            await this.telegramService.sendMessage(
                dto.chatId,
                `👋 Привет, ${userData.firstName}!\n\nЯ бот для запоминания слов.`
            );
        } catch (e) {
            if (!(e instanceof UserAlreadyExistsError)) {
                throw e;
            }
        }
    }
}
