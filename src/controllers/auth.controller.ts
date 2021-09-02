import { Request, Response, NextFunction, Router } from 'express';
import {
    registerUser,
    loginUser
} from '../services/auth.service'

import {
    registerReq
} from '../contract/auth.contract'

interface people {
    user_name: string,
    account_number: string,
    email_address: string,
    identity_number: string,
    password: string
}

interface loginReq {
    username: string,
    password: string
}

const register = async (req: Request, res: Response) => {

    let dataReg: registerReq = {
        user_name: req.body.user_name,
        email_address: req.body.email_address,
        account_number: req.body.account_number,
        identity_number: req.body.identity_number,
        password: req.body.password,
        secret: req.body.secret
    }

    let response = await registerUser(dataReg);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    res.status(201);
    res.json(response.response);

}

const login = async (req: Request, res: Response) => {

    let loginReq: loginReq = {
        username: req.body.username,
        password: req.body.password
    }

    let response = await loginUser(loginReq);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    res.status(201);
    res.json(response)

}

export {
    register,
    login
}