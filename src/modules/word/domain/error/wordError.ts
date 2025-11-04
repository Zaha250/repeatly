/**
 * Ошибка, выбрасываемая, когда слово уже существует.
 */
export class WordAlreadyExistsError extends Error {
    constructor(wordText: string) {
        super(`Слово ${wordText} уже существует.`);
        this.name = 'WordAlreadyExistsError';
    }
}
