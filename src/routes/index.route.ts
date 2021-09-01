import { Request, Response, NextFunction, Router } from 'express';

import {index} from '../controllers/index.controller';
import redisService from '../common/redis';

var router = Router();

router.get('/',redisService.cache, index);

export {router};
