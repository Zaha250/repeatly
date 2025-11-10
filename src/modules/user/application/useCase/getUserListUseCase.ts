import type {IUserRepository} from '../../domain/repository/userRepository';
import type {User} from '../../domain/entity/userEntity';

export class GetUserListUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(): Promise<User[]> {
        try {
            return await this.userRepository.getList();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
