import { Request, Response, NextFunction, Router } from 'express';

import {
    index,
    viewBigWord
} from '../controllers/index.controller';
import redisService from '../common/redis';

var router = Router();

router.get('/',viewBigWord);

export {router as IndexRouter};
