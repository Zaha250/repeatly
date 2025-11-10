import {WordController} from '@src/modules/word/presentation/controller/wordController';
import {WordMongoRepository} from '@src/modules/word/infrastructure/repository/mongo/wordMongoRepository';
import {AddWordUseCase} from '@src/modules/word/application/useCase/addWordUseCase';
import type {ILogger} from '@src/domain/logger';

export interface WordModule {
    wordController: WordController;
}

interface WordDeps {
    logger: ILogger;
}

export function createWordModule(dependencies: WordDeps): WordModule {
    const wordRepository = new WordMongoRepository();

    const addWordUseCase = new AddWordUseCase(wordRepository);

    const wordController = new WordController(addWordUseCase);

    return {
        wordController,
    };
}
