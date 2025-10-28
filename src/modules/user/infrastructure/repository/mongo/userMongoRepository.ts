import {Model, model, Schema} from 'mongoose';
import type {User} from '../../../domain/entity/userEntity';
import type {CreateUserDto, IUserRepository} from '../../../domain/repository/userRepository';
import {MongoDBErrorCodes} from './errors';
import {DatabaseError, UserAlreadyExistsError} from '../../../domain/error/userErrors';

const userSchema = new Schema<User>(
    {
        tgId: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            default: () => new Date().toISOString(),
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

const UserModel: Model<User> = model<User>('User', userSchema);

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

    async create(data: CreateUserDto): Promise<User> {
        try {
            return await UserModel.create(data);
        } catch (e) {
            if (e.code === MongoDBErrorCodes.Duplicate) {
                throw new UserAlreadyExistsError(data.tgId);
            }
            throw new DatabaseError(e.message);
        }
    }
}
