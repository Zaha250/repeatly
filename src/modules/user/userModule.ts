import type {ITelegramService} from '../../core/telegram/telegramServiceInterface.js';
import {UsersController} from './presentation/controller/userController';
import {HandleStartCommandUseCase} from './application/useCase/handleStartCommandUseCase';
import {UserFileRepository} from './infrastructure/repository/userFileRepository';

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
