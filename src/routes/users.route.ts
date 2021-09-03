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

import {
    validateUserAccountIdentity,
    validateUserbyId
} from '../controllers/validator/user.validator'

import redisService from '../common/redis';

var router = Router();

router.use(authMiddleware)

router.route('/')
    .get(redisService.cache, index)
    .post(postUser)

router.route('/:id')
    .patch([validateUserbyId],patchUser)
    .delete([validateUserbyId],delUser)

router.route('/identity/:identity')
    .get([validateUserAccountIdentity,redisService.cache], getUserWithIdentity)

router.route('/account/:account')
    .get([validateUserAccountIdentity,redisService.cache], getUserWithAccount)

export {router as UserRouter};