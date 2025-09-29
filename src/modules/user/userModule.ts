import { Pool } from 'pg';
import type {ITelegramService} from "../../core/telegram/telegramServiceInterface.js";

interface UserModuleDeps {
  db: Pool;
  telegram: ITelegramService;
}

export interface UserModule {
  userController: unknown;
}

export function createUserModule(dependencies: UserModuleDeps): UserModule {
  return {
    userController: undefined
  }
}
