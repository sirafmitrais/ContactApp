import { Request, Response, NextFunction, Router } from 'express';

const validateUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    let dataUserItself = JSON.parse(req.get('user')||"");
    if(dataUserItself == {}){
        dataUserItself = null
    }
    let {id} = req.params
    let compareIdUser:boolean = true; 
    if(id && dataUserItself){
        compareIdUser = (id == dataUserItself.id)
    }else{
        compareIdUser = false
    }
    if(!compareIdUser){
        res.status(422);
        res.json({
            err: "not accessible"
        });
        return;
    }
    next();
    return;
}

const validateUserAccountIdentity = async (req: Request, res: Response, next: NextFunction) => {
    let dataUserItself = JSON.parse(req.get('user')||"");
    if(dataUserItself == {}){
        dataUserItself = null
    }
    let {account, identity} = req.params
    let compareUser:boolean = true; 
    if(account && dataUserItself){
        compareUser = (account == dataUserItself.account_number)
    }
    if(identity && dataUserItself){
        compareUser = (identity == dataUserItself.indetity)
    }
    if(!compareUser){
        res.status(422);
        res.json({
            err: "not accessible"
        });
        return;
    }
    next();
    return;
}

export {
    validateUserAccountIdentity,
    validateUserbyId
}