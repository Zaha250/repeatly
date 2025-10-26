import {z} from 'zod';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
});

const configSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(3500), // coerce преобразует строку в число
    DATABASE_URL: z.string().min(1, 'DATABASE_URL не может быть пустым'),
    TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN не может быть пустым'),
    TELEGRAM_WEBHOOK_SECRET: z.string().optional(),
});

// Валидируем process.env
const parseResult = configSchema.safeParse(process.env);

if (!parseResult.success) {
    // Если валидация провалилась, выводим ошибки и аварийно завершаем приложение
    console.error('❌ Некорректные переменные окружения:', parseResult.error.flatten().fieldErrors);
    throw new Error('Некорректные переменные окружения');
}

export const appConfig = parseResult.data;
