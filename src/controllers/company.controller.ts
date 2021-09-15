import { Request, Response, NextFunction} from 'express'

import {
    companyCreateReq
} from '../contract'

import {
    getAllCompany,
    createCompany,
    getCompanyById
} from '../services/company.service'

import redisService from '../common/redis'

const index = async (req: Request, res: Response, next: NextFunction) => {
    let response = await getAllCompany()
    if(response.error){
        res.status(404);
        res.json(
            {
                error: response.error
            }
        )
    }
    redisService.set(redisService.getKey(req.get('user')||"", req.originalUrl), JSON.stringify(response))
    res.status(200)
    res.json(response)
}

const postCompany = async (req: Request, res: Response, next: NextFunction) => {
    let dataCreate: companyCreateReq = {
        company_name: req.body.company_name,
        description: req.body.description,
        field: req.body.field,
        status: req.body.status,
    }
    if(req.file){
        dataCreate.image_path=req.file.path
    }
    let response = await createCompany(dataCreate)
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    res.status(201)
    res.json(response)
}

const getCompanyId = async (req: Request, res: Response, next: NextFunction) => {
    let response = await getCompanyById(req.params.id)
    if(response.error){
        res.status(400)
        res.json({
            error: response.error
        })
    }
    redisService.set(redisService.getKey(req.get('user')||"", req.originalUrl), JSON.stringify(response))
    res.status(200)
    res.json(response)
}

export {
    index,
    postCompany,
    getCompanyId
}