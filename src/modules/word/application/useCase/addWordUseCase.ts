import type {IWordRepository} from '@src/modules/word/domain/repository/wordRepository';
import type {Word} from '@src/modules/word/domain/entity/word';
import type {AddWordInputDto} from '@src/modules/word/application/dto/wordInputDto';
import {handleError} from '@src/presentation/errors/handleError';

export class AddWordUseCase {
    constructor(private readonly wordRepository: IWordRepository) {}

    async execute(dto: AddWordInputDto): Promise<Word> {
        try {
            return await this.wordRepository.add(dto);
        } catch (error) {
            throw handleError(error);
        }
    }
}
