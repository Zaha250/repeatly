import {AppError} from '@src/presentation/errors/appError';

export function handleError(err: unknown, message = 'Unexpected error'): AppError {
    if (err instanceof AppError) return err;

    if (err instanceof Error) {
        // logger.error(`${message}: ${err.message}`, { stack: err.stack });
        return new AppError(message, 500, 'InternalError');
    }

    // logger.error(`${message}: Non-error thrown`, { value: err });
    return new AppError(message, 500, 'UnknownError');
}
