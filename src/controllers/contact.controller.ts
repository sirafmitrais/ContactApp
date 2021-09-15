import { Request, Response, NextFunction, Router } from 'express';
import {
    getAll,
    getContactById,
    updateContact,
    deleteContactById,
    createContact
} from '../services/contact.service'

import {
    createContactBook
} from '../services/contactBook.service'

import {
    companyBaseSchema,
    contactBaseSchema,
    contactBaseUpdate,
    contactCompleteRes,
    educationBaseSchema
} from '../contract'

import redisService from '../common/redis'

const index = async (req: Request, res: Response, next: NextFunction) => {
    let response = await getAll()
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

const postContact = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("request contain:", req)
    
    let user = JSON.parse(req.get('user')||'{}')
    let education: educationBaseSchema[] = req.body.education
    let companies: companyBaseSchema[] = req.body.company
    let tags: string[] = req.body.tags
    if(typeof req.body.company=='string'){
        companies = JSON.parse(req.body.company)
    }
    if(typeof req.body.education=='string'){
        education = JSON.parse(req.body.education)
    }
    if(typeof req.body.tags == 'string'){
        tags = JSON.parse(req.body.tags)
    }
    let dataCreate: contactBaseSchema = {
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        address: req.body.address,
        phone_number: req.body.phone_number,
        company: companies,
        education: education,
        tags: tags   
    }
    let response = await createContact(dataCreate, user.id);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
    }
    if(response.response){
        let response2 = await createContactBook(user.id, response.response.id)
        if(response2.error){
            res.status(400)
            res.json({
                error: response.error
            })
        }
    }
    res.status(201);
    res.json(response)
}

const delContact = async (req: Request, res: Response, next: NextFunction) => {
    let response = await deleteContactById(req.params.id);
    if(response.error){
        res.status(400)
        res.json({
            error: response.error
        })
    }
    res.status(200)
    res.json(response)
}

const patchContact = async (req: Request, res: Response, next: NextFunction) => {
    let companies: companyBaseSchema[] = req.body.company
    let education: educationBaseSchema[] = req.body.education
    let dataCreate: contactBaseUpdate = {
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        address: req.body.address,
        phone_number: req.body.phone_number,
        company: companies,
        education: education,
        tags: req.body.tags    
    }
    let response = await updateContact(req.params.id, dataCreate)
    if(response.error){
        res.status(400)
        res.json({
            error: response.error
        })
    }
    res.status(201)
    res.json(response)
}

const getContactId = async (req: Request, res: Response, next: NextFunction) => {
    let response = await getContactById(req.params.id);
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
    postContact,
    delContact,
    patchContact,
    getContactId
}