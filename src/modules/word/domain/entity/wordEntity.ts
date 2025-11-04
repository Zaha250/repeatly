export interface WordEntity {
    id: string;
    /* Слово */
    text: string;
    /* Перевод */
    translation: string;
    /* Пример использования */
    example?: string;
    /* Дата создания [ISODate] */
    createdAt: string;
}
