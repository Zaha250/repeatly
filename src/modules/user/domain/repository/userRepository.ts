import type {User} from '../entity/userEntity';

export interface CreateUserDto {
    tgId: number;
    username: string;
    firstName: string;
}

export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findByTgId(telegramId: number): Promise<User | null>;
    create(userData: CreateUserDto): Promise<User>;
}
