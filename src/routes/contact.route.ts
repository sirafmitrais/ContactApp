import {Router} from 'express'
import { authMiddleware } from '../common/middleware/auth.middleware';

import {
    index,
    postContact,
    patchContact,
    getContactId,
    delContact
} from '../controllers/contact.controller'

import redisService from '../common/redis';

var router = Router();

router.use(authMiddleware);

router.route('/')
    .get(redisService.cache,index)
    .post(postContact)

router.route('/:id')
    .get(redisService.cache,getContactId)
    .patch(patchContact)
    .delete(delContact)

export {router as ContactRouter};