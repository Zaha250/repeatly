import {UsersController} from './presentation/controller/userController';
import {HandleStartCommandUseCase} from './application/useCase/handleStartCommandUseCase';
import {UserMongoRepository} from './infrastructure/repository/mongo/userMongoRepository';
import type {INotificationService} from '../../domain/notificationService';

interface UserModuleDeps {
    notificationService: INotificationService;
}

export interface UserModule {
    userController: UsersController;
}

export function createUserModule(dependencies: UserModuleDeps): UserModule {
    const userRepository = new UserMongoRepository();

    const handleStartCommandUseCase = new HandleStartCommandUseCase(
        userRepository,
        dependencies.notificationService
    );

    const userController = new UsersController(handleStartCommandUseCase);

    return {
        userController,
    };
}
