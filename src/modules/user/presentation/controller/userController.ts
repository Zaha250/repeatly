import type {NextFunction, Request, Response} from 'express';
import type {HandleStartCommandUseCase} from '../../application/useCase/handleStartCommandUseCase';
import type {HandleStartCommandRequestDto} from '../dto/userDto';
import {GetUserListUseCase} from '../../application/useCase/getUserListUseCase';
import {success} from '@src/presentation/http/apiResponse';

export class UsersController {
    constructor(
      private readonly handleStartCommand: HandleStartCommandUseCase,
      private readonly getUserListUseCase: GetUserListUseCase
    ) {}

    /**
     * Обработчик команды /start
     * */
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

    /**
     * Получение списка всех пользователей
     * */
    getUserList = async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const userList = await this.getUserListUseCase.execute();

        return res.status(200).json(success(
            userList,
        ));
    }
}
