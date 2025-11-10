import type {
    AddWordData,
    IWordRepository,
} from '@src/modules/word/domain/repository/wordRepository';
import type {Word} from '@src/modules/word/domain/entity/word';
import {WordDocument, WordModel} from '@src/modules/word/infrastructure/repository/mongo/model';
import {WordAlreadyExistsError} from '@src/modules/word/domain/error/wordError';
import {MongoDBErrorCodes} from '@src/infrastructure/database/mongo/error';
import {DatabaseError} from '@src/domain/errors';

export class WordMongoRepository implements IWordRepository {
    async add(word: AddWordData): Promise<Word> {
        try {
            const newWordDoc = await WordModel.create(word);
            return this.toEntity(newWordDoc);
        } catch (e) {
            if (e.code === MongoDBErrorCodes.DuplicateKey) {
                throw new WordAlreadyExistsError(word.text);
            }
            throw new DatabaseError(e.message);
        }
    }

    private toEntity(doc: WordDocument): Word {
        return {
            id: doc.id,
            text: doc.text,
            translation: doc.translation,
            example: doc.example,
            createdAt: doc.createdAt,
        };
    }
}
