import { Request, Response, NextFunction, Router } from 'express';

import {
    getContactById
} from '../services/contact.service'

import {
    getAllByCreator
} from '../services/contactBook.service'

import {
    contactBookList,
    contactCompleteRes,
    userBaseRes
} from '../contract'

import redisService from '../common/redis';

const index = async (req: Request, res: Response) => {
    let user = JSON.parse(req.get('user')||'{}')
    let allContact = await getAllByCreator(user.id)
    if(allContact.error){
        res.status(404)
        res.json(
            {
                error: allContact.error
            }
        )
    }
    let dataResponse: contactCompleteRes[] = []
    if(allContact.response){
        dataResponse=allContact.response
    }
    let response: contactBookList = {
        userCreator: {
            id: user.id,
            name: user.name
        },
        contactList: dataResponse
    }
    redisService.set(redisService.getKey(req.get('user')||"", req.originalUrl), JSON.stringify(response))
    res.status(200)
    res.json(response)
}

export {
    index
}