import {Router} from 'express'
import {
    authMiddleware,
    upload
} from '../common/middleware'

import {
    index, 
    getCompanyId,
    postCompany
} from '../controllers/company.controller'

import redisService from '../common/redis'

var router = Router();

router.use(authMiddleware);

router.route('/')
    .get(redisService.cache, index)
    .post([
        upload(
            "public/upload/images",
            "image/png" || "image/jpeg",
        ).single("photo")
    ], postCompany)

router.route('/:id')
    .get(redisService.cache, getCompanyId)

export {router as CompanyRouter}