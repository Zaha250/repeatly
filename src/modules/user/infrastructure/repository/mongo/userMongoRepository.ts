import {Document} from 'mongoose';
import {UserModel} from './model';
import {User} from '../../../domain/entity/userEntity';
import type {CreateUserModel, IUserRepository} from '../../../domain/repository/userRepository';
import {UserAlreadyExistsError} from '../../../domain/error/userErrors';
import {MongoDBErrorCodes} from '@src/infrastructure/database/mongo/error';
import {DatabaseError} from '@src/domain/errors';

interface UserDocument extends User, Document {}

export class UserMongoRepository implements IUserRepository {
    async findById(id: number): Promise<User | null> {
        try {
            const doc = await UserModel.findById(id);
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
            const user = await UserModel.findOne({tgId});
            return user || null;
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    async create(data: CreateUserModel): Promise<User> {
        try {
            return await UserModel.create(data);
        } catch (e) {
            if (e.code === MongoDBErrorCodes.DuplicateKey) {
                throw new UserAlreadyExistsError(data.tgId);
            }
            throw new DatabaseError(e.message);
        }
    }

    async getList(): Promise<User[]> {
        try {
            const docList = await UserModel.find();
            return docList.map((doc) => this.toEntity(doc));
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    private toEntity(doc: UserDocument): User {
        return new User(
            doc._id.toString(),
            doc.tgId,
            doc.username,
            doc.firstName,
            doc.createdAt,
            doc.isActive
        );
    }
}
