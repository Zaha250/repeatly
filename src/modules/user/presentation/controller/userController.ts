import type {Request, Response} from 'express';
import type {HandleStartCommandUseCase} from '../../application/useCase/handleStartCommandUseCase';
import type {HandleStartCommandRequestDto} from '../dto/userDto';
import {GetUserListUseCase} from '../../application/useCase/getUserListUseCase';

export class UsersController {
    constructor(
      private readonly handleStartCommand: HandleStartCommandUseCase,
      private readonly getUserList: GetUserListUseCase
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
    getUserList = async (req: Request, res: Response) => {
        try {
            console.log(this.getUserList);
            const userList = await this.getUserList.execute();

            res.send({
                status: 200,
                data: userList,
            });
        } catch (e) {
            console.error(e);

            res.send({
                status: 500,
                error: {
                    message: e.message
                }
            });
        }
    }
}
