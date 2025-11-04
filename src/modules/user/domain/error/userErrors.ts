/**
 * Ошибка, выбрасываемая, когда пользователь с таким ID уже существует.
 */
export class UserAlreadyExistsError extends Error {
    constructor(id: string | number) {
        super(`Пользователь с идентификатором ${id} уже существует.`);
        this.name = 'UserAlreadyExistsError';
    }
}

/**
 * Общая ошибка базы данных
 */
export class DatabaseError extends Error {
    constructor(message: string) {
        super(`Внутренняя ошибка базы данных: ${message}`);
        this.name = 'DatabaseError';
    }
}
