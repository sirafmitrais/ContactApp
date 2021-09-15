import {
 ContactModel,
}
from '../schemas/'

import {
    contactBaseSchema,
    contactBaseUpdate,
    contactCompleteRes
} from '../contract/'

type error = string[]

async function getAll(): Promise<{response?:contactCompleteRes[], error?: error|null}>{
    let response:contactCompleteRes[] = [];
    let errors: error = []
    await ContactModel.find({})
        .then((res: any) => {
            response = res
        })
        .catch((err: any) => {
            errors.push(err)
        })
    if(errors.length>0){
        return {
            error: errors
        }
    }
    console.log('enter contact service');
    return {
        response
    }
}

async function getContactById(id: string): Promise<{response?:contactCompleteRes|null, error?: error|null}>{
    let response:contactCompleteRes|null = null;
    let errors: error = []
    await ContactModel.findById(id)
        .then((res: any) => {
            response = res
        })
        .catch((err: any) => {
            errors.push(err)
        })
    if(response == null){
        errors.push("data not found")
    }
    if(errors.length>0){
        return {
            error: errors
        }
    }
    return {
        response
    }
}

async function createContact(dataCreate: contactBaseSchema, idCreator?: string | undefined): Promise<{response?: contactCompleteRes|null, error?: error|null}>{
    let response: contactCompleteRes|null = null
    let errors: error = []
    console.log("data create", dataCreate)
    await ContactModel.create(dataCreate)
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
    return {
        response
    }
}

async function updateContact(id: string, dataUpdate: contactBaseUpdate): Promise<{response?: contactCompleteRes|null, error?: error|null}>{
    let dataUpdated: contactBaseUpdate|null = null
    let errors: error = []
    await ContactModel.findByIdAndUpdate(id, dataUpdate)
        .then((res: any) => {
            dataUpdated = res
        })
        .catch((err: any) => {
            errors.push(err)
        })

    await ContactModel.findById(id)
        .then((res: any) => {
            dataUpdated = res;
        })
        .catch((err: any) => {
            errors.push(err)
        })
    
    if(errors.length>0){
        return {
            error: errors
        }
    }

    return{
        response: dataUpdated
    }
}

async function deleteContactById(id: string): Promise<{message?: string|null, error?: error|null}>{
    let message: string | null = null
    let errors: error = []
    await ContactModel.findByIdAndDelete(id)
        .then((data:any) => {
            if(data == null){
                errors.push("data you want to delete is not found")
            }else{
                message = `success delete contact with id ${id} ${data}`
            }
        })
        .catch((err: any) => {
            errors.push(err.message)
        })

    if(errors.length>0){
        return {
            error: errors
        }
    }

    return {
        message: message
    }
}

export {
    getAll,
    getContactById,
    deleteContactById,
    updateContact,
    createContact
}