/**
 * Ошибка, выбрасываемая, когда пользователь с таким ID уже существует.
 */
export class UserAlreadyExistsError extends Error {
  constructor(identifier: string | number) {
    super(`Пользователь с идентификатором ${identifier} уже существует.`);
    this.name = 'UserAlreadyExistsError';
  }
}

/**
 * Общая ошибка базы данных, скрывающая детали реализации.
 */
export class DatabaseError extends Error {
  constructor(message: string) {
    super(`Внутренняя ошибка базы данных: ${message}`);
    this.name = 'DatabaseError';
  }
}