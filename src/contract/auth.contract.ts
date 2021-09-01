import {peopleGet} from './user.contract'

interface registerResponse {
    peopleData: peopleGet | null,
    message: "success registration",
    token: string
}

interface loginReq {
    username: string,
    password: string
}

export {
    registerResponse,
    loginReq
}