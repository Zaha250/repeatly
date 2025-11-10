export class Word {
    constructor(
        public readonly id: string,
        /* Слово */
        public text: string,
        /* Перевод */
        public translation: string,
        /* Дата создания [ISODate] */
        public readonly createdAt: string,
        /* Пример использования */
        public example?: string
    ) {}
}
