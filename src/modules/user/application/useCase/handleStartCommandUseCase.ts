import type {IUserRepository} from '../../domain/repository/userRepository';
import type {ITelegramService} from '../../../../core/telegram/telegramServiceInterface';
import type {User} from '../../domain/entity/userEntity';

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
        const userEntity: User = {
            id: dto.user.id.toString(), //перенести в репозиторий
            tgId: dto.user.id,
            username: dto.user.username,
            firstName: dto.user.firstName,
            createdAt: new Date().toISOString(), //перенести в репозиторий
        };

        const user = await this.userRepository.findOrCreate(userEntity);

        // Отправляем приветственное сообщение
        const message = `👋 Привет, ${user.firstName}!\n\nЯ бот для запоминания слов. Просто отправь мне слово и его перевод в формате:\n\n*слово - перевод*`;

        // Используем parse_mode Markdown, чтобы звездочки сработали
        await this.telegramService.sendMessage(dto.chatId, message);
    }
}
