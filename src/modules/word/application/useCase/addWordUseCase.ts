import type {IWordRepository} from '@src/modules/word/domain/repository/wordRepository';
import type {WordEntity} from '@src/modules/word/domain/entity/wordEntity';
import type {AddWordInputDto} from '@src/modules/word/application/dto/wordInputDto';

export class AddWordUseCase {
    constructor(private readonly wordRepository: IWordRepository) {}

    async execute(dto: AddWordInputDto): Promise<WordEntity> {
        try {
            return await this.wordRepository.add(dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
