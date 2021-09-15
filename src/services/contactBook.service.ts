import { mongoose } from '../common/database/mongoose.database'
import {
    ContactBookModel,
    ContactModel
} from '../schemas'

import {
    contactBookCompleteRes,
    contactBookList,
    contactCompleteRes
} from '../contract/'

type error = string[]

async function getAllByCreator(idCreator: string): Promise<{response?: contactCompleteRes[]|null, error?: error|null }>{
    let contactBooks: contactBookCompleteRes[]|null = []
    let errors: error = []
    await ContactBookModel.find({id_contact_book: idCreator})
        .then((res: any) => {
            contactBooks = res
        })
        .catch((err: any) => {
            errors.push(err)
        })
    if(errors.length>0){
        return {
            error: errors
        }
    }
    let contactList: contactCompleteRes[] = []
    for(let i=0;i<contactBooks.length;i++){
        let contactDetail: contactCompleteRes = {
            id:"",
            name:"",
            email:"",
            phone_number:"",           
        }
        console.log("contact book id", contactBooks[i]._id)
        console.log("contact book id2", contactBooks[i].id_contact_book)
        console.log("contact book id3", contactBooks[i].id_contact)

        await ContactModel.findById(contactBooks[i].id_contact)
            .then((res: any) => {
                contactDetail = res
            })
        console.log("contact detail", contactDetail)
        contactList.push(contactDetail)
    }
    let response = contactList
    return {
        response
    }
}

async function createContactBook(idCreator: string, idContact: string): Promise<{response?: contactBookCompleteRes|null, error?: error|null}>{
    let response: contactBookCompleteRes|null = null
    let errors: error = []
    await ContactBookModel.create({id_contact_book: idCreator, id_contact: idContact})
        .then((res: any) => {
            response = res
        })
        .catch((err: any) => {
            errors.push(err.message)
        })
    if(errors.length>0){
        return{
            error: errors
        }
    }
    return{
        response
    }
}


export {
    createContactBook,
    getAllByCreator
}