import { Request, Response, NextFunction, Router } from 'express';

const validateField = async (req: Request, res: Response, next: NextFunction) => {
    let err = [];
    if (!req.body.user_name) {
        err.push('Name is required');
    }
    if (!req.body.email_address) {
        err.push('Email is required');
    }
    if (!req.body.account_number) {
        err.push('Account is required');
    }
    if (!req.body.identity_number) {
        err.push('Identity is required');
    }

    if (err.length > 0){
        res.status(422);
        res.json({
            err: err
        });
        return;
    }
    next();
    return;
}

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    let err : string[]= [];
    let {username, password} = req.body
    if (!username) {
        err.push('userame is required');
    }
    if(!password){
        err.push('password is required')
    }
    if (err.length > 0){
        res.status(422);
        res.json({
            err: err
        });
        return;
    }
    next();
    return;
}

export {
    validateField,
    validateLogin
}