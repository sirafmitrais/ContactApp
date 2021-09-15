import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import {
    loginUser,
    registerUser,
} from '../auth.service'

import {
    registerReq,
    peopleGet,
    userBaseRes,
    userPasswordSchema,
} from '../../contract'

import {
    level
} from '../../schemas'

jest.mock('../../schemas/user.schema')

describe('register', () => {
    it('should succesfully register user and return detail of the user + id + jwt token', async () => {
        let dataReq: registerReq = {
            user_name: "newUser",
            email_address: "newUser@gmail.com",
            account_number: "testUserAccount",
            identity_number: "testUserIdentity",
            password: "passwordTest"
        }

        return registerUser(dataReq).then(data => {
            console.log("data test auth", data);
            expect(data.response).toBeDefined()
        })
    })
})