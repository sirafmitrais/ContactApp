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



var router = Router();

router.use(authMiddleware)

router.route('/')
    .get(index)
    .post(postUser)

router.route('/:id')
    .patch(patchUser)
    .delete(delUser)

router.route('/identity/:identity')
    .get(getUserWithIdentity)

router.route('/account/:account')
    .get(getUserWithAccount)

export {router};