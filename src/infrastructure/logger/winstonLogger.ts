import winston from 'winston';
import type {ILogger} from '@src/domain/logger';

const {combine, timestamp, printf, colorize, errors} = winston.format;

const logFormat = printf(({level, message, timestamp, stack}) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
});

export class WinstonLogger implements ILogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(errors({stack: true}), timestamp(), logFormat),
            transports: [
                new winston.transports.Console({
                    format: combine(colorize({all: true}), logFormat),
                }),
                new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
                new winston.transports.File({filename: 'logs/combined.log'}),
            ],
        });

        // В продакшене: JSON формат, без цветов
        if (process.env.NODE_ENV === 'production') {
            this.logger.clear();
            this.logger.add(
                new winston.transports.File({
                    filename: 'logs/app.log',
                    format: winston.format.json(),
                })
            );
        }
    }

    info(message: string, meta?: unknown): void {
        this.logger.info(message, meta);
    }

    warn(message: string, meta?: unknown): void {
        this.logger.warn(message, meta);
    }

    error(message: string, meta?: unknown): void {
        this.logger.error(message, meta);
    }

    debug(message: string, meta?: unknown): void {
        this.logger.debug(message, meta);
    }

    http(message: string, meta?: unknown): void {
        this.logger.log('http', message, meta);
    }
}
