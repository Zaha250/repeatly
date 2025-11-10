import mongoose, {Document, model, Model, Schema} from 'mongoose';
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

// Virtual для id: преобразуем _id в string
userSchema.virtual('id').get(function (this: UserDocument) {
    return this._id.toHexString();
});

// Включаем virtuals в toJSON/toObject (для сериализации, если нужно)
userSchema.set('toObject', {virtuals: true});
userSchema.set('toJSON', {virtuals: true});

export const UserModel: Model<UserDocument> = model('User', userSchema);
