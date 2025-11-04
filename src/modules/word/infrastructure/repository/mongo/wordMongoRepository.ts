import type {AddWordData, IWordRepository} from '@src/modules/word/domain/repository/wordRepository';
import type {WordEntity} from '@src/modules/word/domain/entity/wordEntity';
import {WordModel} from '@src/modules/word/infrastructure/repository/mongo/model';
import {WordAlreadyExistsError} from '@src/modules/word/domain/error/wordError';
import {MongoDBErrorCodes} from '@src/infrastructure/database/mongo/error';
import {DatabaseError} from '@src/modules/user/domain/error/userErrors';

export class WordMongoRepository implements IWordRepository {
    async add(word: AddWordData): Promise<WordEntity> {
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

    private toEntity(doc: any): WordEntity {
        return {
            id: doc._id.toString(),
            text: doc.text,
            translation: doc.translation,
            example: doc.example,
            createdAt: doc.createdAt,
        };
    }
}
