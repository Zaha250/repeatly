import {UserDocument, UserModel} from './model';
import {User} from '../../../domain/entity/userEntity';
import type {CreateUserModel, IUserRepository} from '../../../domain/repository/userRepository';
import {UserAlreadyExistsError} from '../../../domain/error/userErrors';
import {MongoDBErrorCodes} from '@src/infrastructure/database/mongo/error';
import {DatabaseError} from '@src/domain/errors';

export class UserMongoRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        try {
            const doc = await UserModel.findById(id).exec();
            if (!doc) {
                return null;
            }
            return this.toEntity(doc);
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    async findByTgId(tgId: number): Promise<User | null> {
        try {
            const doc = await UserModel.findOne({tgId}).exec();
            return doc ? this.toEntity(doc) : null;
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    async create(data: CreateUserModel): Promise<User> {
        try {
            const doc = await UserModel.create(data);
            return this.toEntity(doc);
        } catch (e) {
            if (e.code === MongoDBErrorCodes.DuplicateKey) {
                throw new UserAlreadyExistsError(data.tgId);
            }
            throw new DatabaseError(e.message);
        }
    }

    async getList(): Promise<User[]> {
        try {
            const docList = await UserModel.find().exec();
            return docList.map((doc) => this.toEntity(doc));
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    private toEntity(doc: UserDocument): User {
        return new User(doc.id, doc.tgId, doc.username, doc.firstName, doc.createdAt, doc.isActive);
    }
}
