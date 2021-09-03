require('dotenv').config();
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { level, UserModel } from '../schemas/user.schema'

import {
    loginReq,
    registerResponse,
    registerReq
} from '../contract'

import {
    people,
    peopleGet,
    peopleReg,
    peopleUpdate,
    userBaseRes,
    userBaseSchema,
    userPasswordSchema
} from '../contract'

import { checkMongoErrorCode } from './helper';
import { configApp } from '../config/env.config';

type error = string[]

function generateJwt(user: peopleGet | any){
    const secret:string = process.env.SECRET_KEY?.toString() || "secret123";

    let userData: userBaseRes = {
        id: user.id,
        user_name: user.user_name,
        email_address: user.email_address,
        account_number: user.account_number,
        identity_number: user.identity_number,
        level: user.level
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

async function registerUser(dataReq: registerReq): Promise<{response?: registerResponse|null, error?: error|null }>{
    let resData: userBaseRes|null = null;
    let errors: error = [];

    let dataRegistration: userPasswordSchema= {
        user_name: dataReq.user_name,
        email_address: dataReq.email_address,
        account_number: dataReq.account_number,
        identity_number: dataReq.identity_number,
        level: level.Noob,
        password: await encryptPassword(dataReq.password)
    }

    if(dataReq.secret==configApp.MAGIC_KEYWORD){
        dataRegistration.level = level.Godfather
    }

    await UserModel.create(dataRegistration)
        .then((response: any) => {
            resData = {
                id:response._id,
                user_name: response.user_name,
                email_address: response.email_address,
                account_number: response.account_number,
                identity_number: response.identity_number,
                level: response.level
            }
        })
        .catch((err: any) => {
            let errorResponse = checkMongoErrorCode(err);
            errors.push(errorResponse);
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
        let compare = await comparePassword(loginReq.password, resData.password);
        if(!compare){
            errors.push("password and username are not match")
        }
    }
    if(errors.length>0){
        return {
            error: errors
        }
    }
    else{
        token = generateJwt(resData);
    return {
        token: token
    }
    }
    
}

export {
    registerUser,
    loginUser
}