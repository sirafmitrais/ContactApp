import { UserModel } from '../schemas/'

import {
    people,
    peopleUpdate,
    peopleGet,
    peopleReg
} from '../contract/user.contract'

type error = string[]

async function listIndex(): Promise<{listPeople?: people[], error?: error|null }>{
    let resData: people[] = [];
    let errors: error = [];
    await UserModel.find({})
        .then((res: any) =>{
            resData = res
        })
        .catch((err: any) => {
            errors.push(err)
        })
    if(errors.length>0){
        return {
            error: errors
        }
    }
    return {
       listPeople : resData
    }
}

async function createUser(dataReq: people): Promise<{response?: peopleGet|null, error?: error|null }>{
    let resData: peopleGet|null = null;
    let errors: error = [];
    await UserModel.create(dataReq)
        .then((response: any) => {
            resData = response
        })
        .catch((err: any) => {
            errors.push(err);
        })

    if(errors.length>0){
        return {
            error: errors
        }
    }
    return {
        response: resData
    }
}

async function deleteUser(id: string): Promise<{message?: string|null, error?: error|null}>{
    let message: string | null = null
    let errors: error = [];
    await UserModel.findByIdAndDelete(id)
        .then( (_: any) => {
            message = `success delete user with id ${id}`           
        })
        .catch((err: any) => {
            errors.push(err);
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

async function updateUser(id: string, dataUpdate: peopleUpdate): Promise<{response?: peopleGet|null, error?: error|null}>{
    let dataUpdated: peopleGet|null = null
    let errors: error = [];
    await UserModel.findByIdAndUpdate(id, dataUpdate)
        .then((res: any) => {
            dataUpdated = res
        })
        .catch((err: any) => {
            errors.push(err);
        })

    await UserModel.findById(id)
        .then((res: any) => {
            dataUpdated = res;
        })
        .catch((err: any) => {
            errors.push(err);
        })

    if(errors.length>0){
        return {
            error: errors
        }
    }
    
    return {
        response: dataUpdated
    }
}

async function getUserByAccount(accountNumber: string): Promise<{response?: peopleGet|null, error?: error|null}>{
    let dataFind: peopleGet|null = null
    let errors: error = [];
    await UserModel.findOne({account_number: accountNumber})
        .then((res: any) => {
            dataFind = res
        })
        .catch((err: any) => {
            errors.push(err)
        })
    
    if(errors.length>0){
        return {
            error: errors
        }
    }
    return {
        response: dataFind
    }
}

async function getUserByIndentity(identityNumber: string): Promise<{response?: peopleGet|null, error?: error|null}>{
    let dataFind: peopleGet|null = null
    let errors: error = [];
    await UserModel.findOne({identity_number: identityNumber})
        .then((res: any) => {
            dataFind = res
        })
        .catch((err: any) => {
            errors.push(err)
        })
    
    if(errors.length>0){
        return {
            error: errors
        }
    }
    return {
        response: dataFind
    }
}

export {
    listIndex,
    createUser,
    deleteUser,
    updateUser,
    getUserByAccount,
    getUserByIndentity
}