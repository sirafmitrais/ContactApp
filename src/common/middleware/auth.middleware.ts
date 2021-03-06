import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken'

import { UserModel } from '../../schemas/user.schema'
import { Logger } from './logger.middleware';


const getToken = (req: Request) => {
    const toRemove = 'bearer ';
    let authorization = req.get('authorization');
    if (!authorization) return null;
    return authorization.slice(toRemove.length);
}

const decodeToken = (token: string) => {
    return jwt.verify(token,process.env.SECRET_KEY?.toString() || "secret123");
}

const isExpire = (exp:any) => {
    let now = Math.floor(Date.now() / 1000);

    return now > exp;
} 

const getUser = async (username: string) => {
    return await UserModel.findOne({
        user_name: username
    }, '-password -created_at -updated_at');
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token = getToken(req);
    if (!token) {
        Logger.error('UnAuthorize Access')
        res.status(401);
        res.json({
            err:['please login']
        });
        return;
    }
    let payload: any = null;
    try {
        payload = await decodeToken(token);
    } catch (err){
        if(err instanceof jwt.JsonWebTokenError){
            Logger.error('Token Invalid')  
            res.status(401);
            res.json({
                err: ['please re-login']
            });
            return;
        }
    }

    if (isExpire(payload.exp)){
        Logger.error('Token Expire')
        res.status(401);
        res.json({
            err: ['please re-login']
        });
        return;
    }
    req.headers.user = JSON.stringify(payload)
    req.headers.token = token
    next();
}

export {
    auth as authMiddleware
}