import type { IUserRepository } from '../../domain/repository/userRepository';
import type { User } from '../../domain/entity/userEntity';

export class GetUserListUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    try {
      return this.userRepository.getList();
    } catch (e) {
      throw e;
    }
  }
}