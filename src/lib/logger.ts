// Production-ready Logger

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogData {
    message: string;
    level: LogLevel;
    timestamp: string;
    data?: any;
}

class Logger {
    private isDev = process.env.NODE_ENV !== 'production';

    private log(level: LogLevel, message: string, data?: any) {
        const logData: LogData = {
            message,
            level,
            timestamp: new Date().toISOString(),
            ...(data && { data }),
        };

        if (this.isDev) {
            // Pretty print in development
            const emoji = {
                info: '📘',
                warn: '⚠️',
                error: '❌',
                debug: '🔍',
            }[level];

            console[level === 'debug' ? 'log' : level](
                `${emoji} [${level.toUpperCase()}]`,
                message,
                data || ''
            );
        } else {
            // JSON format for production (easier to parse by monitoring tools)
            console[level === 'debug' ? 'log' : level](JSON.stringify(logData));
        }
    }

    info(message: string, data?: any) {
        this.log('info', message, data);
    }

    warn(message: string, data?: any) {
        this.log('warn', message, data);
    }

    error(message: string, data?: any) {
        this.log('error', message, data);
    }

    debug(message: string, data?: any) {
        if (this.isDev) {
            this.log('debug', message, data);
        }
    }
}

export const logger = new Logger();
