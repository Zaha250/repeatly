import {UserFileRepository} from './infrastructure/userFileRepository';
import type {ITelegramService} from '../../core/telegram/telegramServiceInterface.js';
import {UsersController} from './presentation/userController';
import {HandleStartCommandUseCase} from './application/handleStartCommandUseCase';

interface UserModuleDeps {
    telegram: ITelegramService;
}

export interface UserModule {
    userController: UsersController;
}

export function createUserModule(dependencies: UserModuleDeps): UserModule {
    const userRepository = new UserFileRepository();

    const handleStartCommandUseCase = new HandleStartCommandUseCase(
        userRepository,
        dependencies.telegram
    );

    const userController = new UsersController(handleStartCommandUseCase);

    return {
        userController,
    };
}
