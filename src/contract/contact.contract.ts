import {
    educationBaseSchema,
    educationCompleteRes
} from './'
import { companyBaseSchema } from './company.contract'

interface contactBaseSchema {
    name: string,
    title?: string,
    company?: companyBaseSchema[],
    education?: educationBaseSchema[],
    address?: string,
    phone_number: string,
    email: string,
    tags?: string[]
}

interface contactBaseUpdate {
    name?: string,
    title?: string,
    company?: companyBaseSchema[],
    education?: educationBaseSchema[],
    address?: string,
    phone_number?: string,
    email?: string,
    tags?: string[]
}

interface contactCompleteRes extends contactBaseSchema {
    id: string
}

export {
    contactBaseSchema,
    contactBaseUpdate,
    contactCompleteRes
}