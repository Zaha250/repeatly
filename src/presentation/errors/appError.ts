export class AppError extends Error {
    constructor(
        public override readonly message: string,
        public readonly statusCode = 500,
        public readonly type = 'AppError',
        public readonly details?: unknown
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
