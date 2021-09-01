import { Request, Response, NextFunction, Router } from 'express';
import { authMiddleware } from '../common/middleware/auth.middleware';

import {
    index,
    postUser,
    patchUser,
    delUser,
    getUserWithAccount,
    getUserWithIdentity
} from '../controllers/user.controller';

import redisService from '../common/redis';

var router = Router();

router.use(authMiddleware)

router.route('/')
    .get(redisService.cache, index)
    .post(postUser)

router.route('/:id')
    .patch(patchUser)
    .delete(delUser)

router.route('/identity/:identity')
    .get(redisService.cache, getUserWithIdentity)

router.route('/account/:account')
    .get(redisService.cache, getUserWithAccount)

export {router};