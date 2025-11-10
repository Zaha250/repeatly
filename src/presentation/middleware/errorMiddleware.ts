import type {Request, Response, NextFunction} from 'express';
import {AppError} from '../errors/appError';
import {failure} from '../http/apiResponse';

/**
 * Централизованный обработчик ошибок.
 * Express автоматически вызывает его, когда 'next(e)' вызывается
 * или когда в async-роуте происходит ошибка.
 */
export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
    // Если это не AppError, делаем обобщённую ошибку
    if (!(err instanceof AppError)) {
        console.error('Unhandled error:', err);
        const response = failure('Internal server error', 500);
        return res.status(500).json(response);
    }

    console.warn('Handled error:', err);

    const response = failure(err.message, err.statusCode, err.details);

    return res.status(err.statusCode).json(response);
}
