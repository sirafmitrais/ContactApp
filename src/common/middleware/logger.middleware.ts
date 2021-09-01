import { Request, Response, NextFunction, Router } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let date = new Date();
    let datetime = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let msg = `${datetime} => [${req.method.toUpperCase()}] ${req.path}`;
    console.log(msg);

    next();
}

export default loggerMiddleware