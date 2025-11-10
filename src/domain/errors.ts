import {AppError} from '@src/presentation/errors/appError';

/**
 * Общая ошибка базы данных
 */
export class DatabaseError extends AppError {
    constructor(message: string) {
        super(`Внутренняя ошибка базы данных: ${message}`, 500, 'DatabaseError');
        this.name = 'DatabaseError';
    }
}

/**
 * Ресурс не найден
 */
export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404, 'NotFoundError');
        this.name = 'NotFoundError';
    }
}
