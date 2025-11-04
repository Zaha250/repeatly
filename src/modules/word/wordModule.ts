import {WordController} from '@src/modules/word/presentation/controller/wordController';
import {WordMongoRepository} from '@src/modules/word/infrastructure/repository/mongo/wordMongoRepository';
import {AddWordUseCase} from '@src/modules/word/application/useCase/addWordUseCase';

export interface WordModule {
    wordController: WordController;
}

export function createWordModule(): WordModule {
    const wordRepository = new WordMongoRepository();

    const addWordUseCase = new AddWordUseCase(wordRepository);

    const wordController = new WordController(
        addWordUseCase,
    );

    return {
        wordController,
    };
}
