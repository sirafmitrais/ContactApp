import {Router} from 'express'
import {
    authMiddleware,
} from '../common/middleware'

import {
    index
} from '../controllers/contactBook.controller'

import redisService from '../common/redis'

var router = Router()

router.use(authMiddleware)

router.route('/')
    .get(redisService.cache, index)

export {router as ContactBookRouter}