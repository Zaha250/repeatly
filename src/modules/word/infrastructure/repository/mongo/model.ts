import {model, type Model, Schema} from 'mongoose';
import type {WordEntity} from '@src/modules/word/domain/entity/wordEntity';

const wordScheme = new Schema<WordEntity>(
    {
        text: {
            type: String,
            required: true
        },
        translation: {
            type: String,
            required: true
        },
        example: String,
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

export const WordModel: Model<WordEntity> = model<WordEntity>('Word', wordScheme);
