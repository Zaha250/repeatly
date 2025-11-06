import {model, Model, Schema} from 'mongoose';
import type {User} from '../../../domain/entity/userEntity';

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

export const UserModel: Model<User> = model('User', userSchema);
