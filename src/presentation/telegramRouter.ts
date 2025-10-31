import type {ITelegramRouterAdapter} from './routerInterface';
import type {UsersController} from '../modules/user/presentation/controller/userController';

export function bootstrapTelegramRouter(
    routerAdapter: ITelegramRouterAdapter,
    userController: UsersController
) {
    routerAdapter.onStart(userController.handleStart);
}
