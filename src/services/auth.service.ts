require('dotenv').config();
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { UserModel } from '../schemas/user.schema'

import {
    loginReq,
    registerResponse
} from '../contract/auth.contract'

import {
    people,
    peopleGet,
    peopleReg,
    peopleUpdate
} from '../contract/user.contract'

type error = string[]

function generateJwt(user: peopleGet | any){
    const secret:string = process.env.SECRET_KEY?.toString() || "secret123";

    let userData: peopleGet = {
        id: user.id,
        user_name: user.user_name,
        email_address: user.email_address,
        account_number: user.account_number,
        identity_number: user.identity_number
    }

    return jwt.sign(
        userData,
        secret,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        });
}

async function encryptPassword(password: string): Promise<string>{
    const saltRounds = 10;
    let encrypt = '';
    await bcrypt.hash(password, saltRounds)
        .then((res) => {
            encrypt = res;
        })
    return encrypt
}

async function comparePassword(password: string, encryptedPass: string): Promise<boolean>{
    let result = false;
    await bcrypt.compare(password, encryptedPass)
        .then((res) => {
            result = res
        })
    return result;
}

async function registerUser(dataReq: peopleReg): Promise<{response?: registerResponse|null, error?: error|null }>{
    let resData: peopleGet|null = null;
    let errors: error = [];

    const dataRegistration: peopleReg = {
        user_name: dataReq.user_name,
        email_address: dataReq.email_address,
        account_number: dataReq.account_number,
        identity_number: dataReq.identity_number,
        password: await encryptPassword(dataReq.password)
    }
    await UserModel.create(dataRegistration)
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

    let token = generateJwt(resData);
    return {
        response: {
            peopleData: resData,
            message: "success registration",
            token: token
        }
    }
}

async function loginUser(loginReq: loginReq): Promise<{token?: string|null, error?: error|null}> {
    let token = null;
    let errors: error = [];
    let resData: any = {}

    await UserModel.findOne({user_name: loginReq.username})
        .then((response: any) => {
            resData = response
        })
        .catch((err: any) => {
            errors.push(err);
        }) 

    if(resData != null){
        if(!comparePassword(loginReq.password, resData.password)){
            errors.push("wrong password")
        }
    }

    if(errors.length>0){
        return {
            error: errors
        }
    }
    token = generateJwt(resData);
    return {
        token: token
    }
}

export {
    registerUser,
    loginUser
}