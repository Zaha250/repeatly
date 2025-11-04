import {UserModel} from './model';
import type {User} from '../../../domain/entity/userEntity';
import type {CreateUserModel, IUserRepository} from '../../../domain/repository/userRepository';
import {UserAlreadyExistsError} from '../../../domain/error/userErrors';
import {MongoDBErrorCodes} from '@src/infrastructure/database/mongo/error';
import {DatabaseError} from '@src/domain/errors';

export class UserMongoRepository implements IUserRepository {
    async findById(id: number): Promise<User | null> {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return null;
            }
            return user;
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
            return await UserModel.find();
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }
}
