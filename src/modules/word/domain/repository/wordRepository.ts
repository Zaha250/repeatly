import type {WordEntity} from '../entity/wordEntity';

export type AddWordData = Omit<WordEntity, 'id' | 'createdAt'>;

export interface IWordRepository {
    add(word: AddWordData): Promise<WordEntity>;
}
