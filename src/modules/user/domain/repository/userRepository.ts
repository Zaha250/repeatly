import type {User} from '../entity/userEntity';

export interface CreateUserModel {
    tgId: number;
    username: string;
    firstName: string;
}

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByTgId(telegramId: number): Promise<User | null>;
    create(userData: CreateUserModel): Promise<User>;
    getList(): Promise<User[]>;
}
