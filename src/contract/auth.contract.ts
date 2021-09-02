import {peopleGet} from './user.contract'
interface loginReq {
    username: string,
    password: string
}

interface registerReq {
    user_name: string,
    account_number: string,
    email_address: string,
    identity_number: string,
    password: string,
    secret?: string
}

interface registerResponse {
    peopleData: peopleGet | null,
    message: "success registration",
    token: string
}


export {
    registerReq,
    registerResponse,

    loginReq,

}