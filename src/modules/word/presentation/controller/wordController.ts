import type {AddWordUseCase} from '@src/modules/word/application/useCase/addWordUseCase';
import type {NextFunction, Request, Response} from 'express';
import {success} from '@src/presentation/http/apiResponse';
import type {AddWordRequestDto} from '@src/modules/word/presentation/dto/wordDto';

export class WordController {
    constructor(
        private readonly addWordUseCase: AddWordUseCase
    ) {}

    public addWord = async (
        req: Request<undefined, undefined, AddWordRequestDto>,
        res: Response,
        _next: NextFunction
    ) => {
        const body = req.body;
        const newWord = await this.addWordUseCase.execute(body);
        return res
            .status(201)
            .json(success(newWord));
    }
}
