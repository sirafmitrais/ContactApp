import { Request, Response, NextFunction, Router } from 'express';
import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : "warn"
}

const color = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
}

winston.addColors(color)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error'
    }),
    new winston.transports.File({filename: 'logs/all.log'}),
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})


const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let date = new Date();
    let datetime = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let msg = `[${req.method.toUpperCase()}] ${req.path}`;
    // console.log(msg);
    Logger.http(msg);
    next();
}

export {
    loggerMiddleware,
    Logger
}