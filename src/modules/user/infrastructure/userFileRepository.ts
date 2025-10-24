import { promises as fs } from 'fs';
import path from 'path';
import type { IUserRepository } from '../domain/userRepository';
import type { User } from '../domain/userEntity';

// Определяем путь к файлу в корне проекта
const dbPath = path.resolve(process.cwd(), 'users.json');

export class UserFileRepository implements IUserRepository {
    /**
     * Приватный метод для чтения всех пользователей из файла
     */
    private async readDb(): Promise<User[]> {
        try {
            const data = await fs.readFile(dbPath, 'utf-8');
            return JSON.parse(data) as User[];
        } catch (error) {
            // Если файл не найден (первый запуск), возвращаем пустой массив
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    /**
     * Приватный метод для записи всех пользователей в файл
     */
    private async writeDb(users: User[]): Promise<void> {
        await fs.writeFile(dbPath, JSON.stringify(users, null, 2), 'utf-8');
    }

    /**
     * Поиск пользователя по его ID
     */
    async findById(id: number): Promise<User | null> {
        const users = await this.readDb();
        return users.find((user) => user.id === id) || null;
    }

    /**
     * Поиск пользователя по его Telegram ID
     */
    async findByTgId(tgId: number): Promise<User | null> {
        const users = await this.readDb();
        return users.find((user) => user.tgId === tgId) || null;
    }

    /**
     * Реализация метода из интерфейса
     */
    async findOrCreate(user: User): Promise<User> {
        const users = await this.readDb();
        const existingUser = users.find((u) => u.id === user.id);

        // Если пользователь найден, просто возвращаем его
        if (existingUser) {
            return existingUser;
        }

        // Если нет, добавляем нового и сохраняем файл
        console.log(`[FileRepository] Создан новый пользователь: ${user.username}`);
        users.push(user);
        await this.writeDb(users);

        return user;
    }
}
