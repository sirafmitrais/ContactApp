import {level} from '../schemas/user.schema'
interface people {
    user_name: string,
    account_number: string,
    email_address: string,
    identity_number: string    
}

type peopleUpdate = {
    user_name?: string,
    account_number?: string,
    email_address?: string,
    identity_number?: string
}

interface peopleGet extends people {
    id: string
}

interface peopleReg {
    user_name: string,
    account_number: string,
    email_address: string,
    identity_number: string,
    password: string
}

interface userBaseSchema {
    user_name: string,
    account_number: string,
    email_address: string,
    identity_number: string,
    level?: level
}

interface userPasswordSchema extends userBaseSchema{
    password: string
}

interface userBaseRes extends userBaseSchema{
    id: string
}

export {
    people,
    peopleGet, 
    peopleReg, 
    peopleUpdate,
    userBaseSchema,
    userPasswordSchema,
    userBaseRes
}