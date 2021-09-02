import { Request, Response, NextFunction, Router } from 'express';
import {
    getAll,
    getContactById,
    updateContact,
    deleteContactById,
    createContact
} from '../services/contact.service'

import {
    companyBaseSchema,
    contactBaseSchema,
    contactBaseUpdate,
    contactCompleteRes,
    educationBaseSchema
} from '../contract'

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
    res.status(200)
    res.json(response)
}

const postContact = async (req: Request, res: Response, next: NextFunction) => {
    let companies: companyBaseSchema[] = req.body.company
    let education: educationBaseSchema[] = req.body.education
    let dataCreate: contactBaseSchema = {
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        phone_number: req.body.phone_number,
        company: companies,
        education: education,
        tags: req.body.tags    
    }
    let response = await createContact(dataCreate);
    if(response.error){
        res.status(400);
        res.json({
            error: response.error
        })
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