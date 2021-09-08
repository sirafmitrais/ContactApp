import { Request, Response, NextFunction, Router } from 'express';
import {
    listIndex,
    createUser,
    updateUser,
    deleteUser,
    getUserByAccount,
    getUserByIndentity
} from '../services/user.service';

import {
    people,
    peopleUpdate,
} from '../contract/user.contract'

import redisService from '../common/redis'
import { Logger } from '../common/middleware/logger.middleware';


const index = async (req: Request, res: Response, next: NextFunction) => {
    let response = await listIndex();
    if(response.error){
        Logger.error(response.error);
        res.status(404);
        res.json(
            {
                error: response.error
            }
        )
    }
    redisService.set(redisService.getKey(req.get('user')||"", req.originalUrl), JSON.stringify(response))
    res.status(200)
    res.json(response);
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    let dataCreate: people = {
        user_name: req.body.user_name,
        email_address: req.body.email_address,
        identity_number: req.body.identity_number,
        account_number: req.body.account_number
    } 
    let response = await createUser(dataCreate);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    res.status(200);
    res.json(response);
}

const delUser = async (req: Request, res: Response, next: NextFunction) => {
    let response = await deleteUser(req.params.id);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    res.status(200);
    res.json(response)
}

const patchUser = async (req: Request, res: Response, next: NextFunction) => {
    let dataUpdate: peopleUpdate = {
        user_name: req.body.user_name,
        email_address: req.body.email_address,
        identity_number: req.body.identity_number,
        account_number: req.body.account_number
    }
    let response = await updateUser(req.params.id, dataUpdate);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    res.status(200);
    res.json(response)
}

const getUserWithAccount = async (req: Request, res: Response, next: NextFunction) => {
    let response = await getUserByAccount(req.params.account);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    redisService.set(redisService.getKey(req.get('user')||"", req.originalUrl), JSON.stringify(response))
    res.status(200);
    res.json(response)
}

const getUserWithIdentity = async (req: Request, res: Response, next: NextFunction) => {
    let response = await getUserByIndentity(req.params.identity);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    redisService.set(redisService.getKey(req.get('user')||"", req.originalUrl), JSON.stringify(response))
    res.status(200);
    res.json(response)
}

export {
    index,
    postUser,
    patchUser,
    delUser,
    getUserWithAccount,
    getUserWithIdentity
}