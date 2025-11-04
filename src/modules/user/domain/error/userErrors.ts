import {AppError} from '@src/presentation/errors/appError';

/**
 * Ошибка, выбрасываемая, когда пользователь с таким ID уже существует.
 */
export class UserAlreadyExistsError extends AppError {
    constructor(id: string | number) {
        super(
            `Пользователь с идентификатором ${id} уже существует.`,
            409,
            'UserAlreadyExistsError'
        );
        this.name = 'UserAlreadyExistsError';
    }
}
