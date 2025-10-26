import mongoose from 'mongoose';
import {appConfig} from '../config';

export async function connectToMongo() {
    try {
        await mongoose.connect(appConfig.MONGO_DB_URL);
        console.log('Успешное подключение к MongoDB 🍃');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB: ', error);
        process.exit(1); // Выходим, если не смогли подключиться к БД
    }
}
