import type {HandleStartCommandRequestDto} from '../modules/user/presentation/dto/userDto';

export type StartHandler = (dto: HandleStartCommandRequestDto) => Promise<void>;

export interface ITelegramRouterAdapter {
    /**
     * Регистрирует обработчик на команду /start
     */
    onStart(handler: StartHandler): void;

    // В будущем здесь будет:
    // onHelp(handler: ...): void;
}
