import mongoose from 'mongoose';
import {appConfig} from '../../config';

/**
 * Подключение к MongoDB
 * @returns {Promise<void>} Promise, который будет выполнен, когда подключение к MongoDB будет успешно выполнено
 * @throws {Error} Если не смогли подключиться к MongoDB, процесс будет остановлен
 */
export async function connectToMongo() {
    try {
        await mongoose.connect(appConfig.MONGO_DB_URL);
        console.log('Успешное подключение к MongoDB 🍃');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB: ', error);
        process.exit(1); // Выходим, если не смогли подключиться к БД
    }
}
