import { Request, Response, NextFunction, Router } from 'express';
import {listIndex} from '../services/index.service';
import redisService from '../common/redis'
// req.path
const index = async (req: Request, res: Response, next: NextFunction) => {
    let response = await listIndex();
    if(response.error){
        res.status(404);
        res.json(
            {
                error: [response.error]
            }
        )
    }
    const redis_key = req.path;
    redisService.set(redis_key, JSON.stringify(response.listHewan))
    res.status(200)
    res.json(response.listHewan);
};

const viewBigWord = async (req: Request, res: Response, next: NextFunction) => {
    res.render('index', {text: 'Hey Kamu, Iyaa Kamu'});
}

export {
    index,
    viewBigWord
}