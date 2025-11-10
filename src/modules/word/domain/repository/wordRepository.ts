import type {Word} from '../entity/word';

export type AddWordData = Omit<Word, 'id' | 'createdAt'>;

export interface IWordRepository {
    add(word: AddWordData): Promise<Word>;
}
