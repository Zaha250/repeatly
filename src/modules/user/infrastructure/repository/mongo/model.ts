import {Document, model, Model, Schema} from 'mongoose';
import {User} from '../../../domain/entity/userEntity';

export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>(
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

export const UserModel: Model<UserDocument> = model('User', userSchema);
