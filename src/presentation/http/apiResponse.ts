interface SuccessResponse<T> {
    data: T;
}

interface ErrorResponse {
    error: {
        code: number;
        message: string;
        details?: unknown;
    };
}

/**
 * Создает успешный ответ.
 * @template T Тип данных, который будет содержаться в ответе.
 * @param data Данные, которые будут содержаться в ответе.
 * @returns Объект, содержащий данные и тип SUCCESS_RESPONSE.
 */
export function success<T>(data: T): SuccessResponse<T> {
    return {
        data,
    };
}

/**
 * Создает ошибочный ответ.
 * @param message Текст ошибки.
 * @param code Код ошибки. По умолчанию равен 500.
 * @param details Дополнительные данные об ошибке.
 * @returns Объект, содержащий информацию об ошибке и тип ERROR_RESPONSE.
 */
export function failure(message: string, code = 500, details?: unknown): ErrorResponse {
    return {
        error: {message, code, details},
    };
}
