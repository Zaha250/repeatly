import type {User} from '../entity/userEntity';

export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findByTgId(tgId: number): Promise<User | null>;
    findOrCreate(user: User): Promise<User>;
}
