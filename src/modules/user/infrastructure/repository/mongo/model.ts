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

userSchema.virtual('id').get(function (this: UserDocument) {
    return this._id.toHexString();
});

userSchema.set('toObject', {virtuals: true});
userSchema.set('toJSON', {virtuals: true});

export const UserModel: Model<UserDocument> = model('User', userSchema);
