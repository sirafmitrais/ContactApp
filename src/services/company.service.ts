import {
 CompanyModel
}
from '../schemas/'

import {
    companyCreateReq,
    companyCompleteRes
} from '../contract'

type error = string []

async function getAll(): Promise<{response?:companyCompleteRes[], error?: error|null}>{
    let response: companyCompleteRes[]=[]
    let errors: error = []
    await CompanyModel.find({})
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
    return {
        response
    }
}

async function createCompany(dataCreate: companyCreateReq): Promise<{response?: companyCompleteRes|null, error?: error|null}>{
    let response: companyCompleteRes|null = null
    let errors: error = []
    await CompanyModel.create(dataCreate)
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

async function getCompanyById(id: string): Promise<{response?:companyCompleteRes|null, error?: error|null}>{
    let response: companyCompleteRes|null = null
    let errors: error = []
    await CompanyModel.findById(id)
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

export {
    getAll as getAllCompany,
    createCompany,
    getCompanyById
}