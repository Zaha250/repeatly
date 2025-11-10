import {model, type Model, Schema, Document} from 'mongoose';
import type {Word} from '@src/modules/word/domain/entity/word';

export interface WordDocument extends Word, Document {}

const wordScheme = new Schema<WordDocument>(
    {
        text: {
            type: String,
            required: true,
        },
        translation: {
            type: String,
            required: true,
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

wordScheme.virtual('id').get(function (this: WordDocument) {
    return this._id.toHexString();
});

wordScheme.set('toObject', {virtuals: true});
wordScheme.set('toJSON', {virtuals: true});

export const WordModel: Model<WordDocument> = model('Word', wordScheme);
