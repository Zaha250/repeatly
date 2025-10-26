import {Model, Schema, model} from 'mongoose';
import type {User} from '../../domain/entity/userEntity';
import type {IUserRepository} from '../../domain/repository/userRepository';

const userSchema = new Schema<User>(
    {
        id: {
            type: String,
            default: () => crypto.randomUUID(), // Генерирует UUID
            unique: true,
            required: true,
            index: true,
        },
        tgId: {
            type: Number,
            required: true,
            unique: true,
            index: true,
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
        _id: false,
        timestamps: false,
        versionKey: false,
    }
);

const UserModel: Model<User> = model<User>('User', userSchema);

// 3. Реализуем наш ИНТЕРФЕЙС
export class UserMongoRepository implements IUserRepository {
    async findByTgId(tgId: number): Promise<User | null> {
        const user = await UserModel.findOne({tgId}).lean();
        return user || null;
    }

    async create(data: CreateUserData): Promise<User> {
        // UserModel.create() атомарно создает и сохраняет документ
        // Он автоматически сгенерирует `id` и `createdAt` благодаря схеме.
        const newUser = await UserModel.create(data);

        // .toObject() нужен, чтобы вернуть чистый объект, а не Mongoose-документ
        return newUser.toObject();
    }
}
