export class User {
    constructor(
        public readonly id: string,
        public readonly tgId: number,
        public username: string,
        public firstName: string,
        public readonly createdAt: string,
        public isActive: boolean
    ) {}

    /**
     * Получения даты создания
     * @returns {Date} - Дата
     * */
    getCreatedAtDate(): Date {
        return new Date(this.createdAt);
    }

    /**
     * Проверка активности пользователя
     * */
    isUserActive(): boolean {
        return this.isActive;
    }

    /**
     * Деактивация пользователя
     * */
    deactivate(): void {
        this.isActive = false;
    }

    /**
     * Активации пользователя
     * */
    activate(): void {
        this.isActive = true;
    }
}
