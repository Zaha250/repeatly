import { Pool } from 'pg';

interface UserModuleDeps {
  db: Pool;
}

export interface UserModule {
  userController: unknown;
}

export function createUserModule(dependencies: UserModuleDeps): UserModule {
  return {
    userController: undefined
  }
}