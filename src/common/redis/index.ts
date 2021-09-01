import { createClient } from "redis";
import { Request, Response, NextFunction, Router } from 'express';

const clientLocal = createClient(6379, "localhost")


/**
 * get redis cache
 * @param {string} redis_key
 */
function get(redis_key:string){
    return new Promise((resolve) => {
        clientLocal.get(redis_key, (err, reply) => {
            if(err){
                console.error("Redis GET Connection Err: ", err)
            }
            else{
                console.log("Success Redis GET: ", redis_key)
                console.log("type of, ", typeof reply)
                const data = JSON.parse(reply || '{}');
                resolve({data})
            }
        })
    })
}

/**
 * set redis cache
 * @param {string} redis_key
 * @param {string} redis_value
 */
function set(redis_key:string, redis_value:string){
    console.log("Success Redis SET: ", redis_key)
    
    let res = clientLocal.setex(redis_key,20,redis_value);
    console.log("check set :",res)
}


function cache(req: Request, res: Response, next: NextFunction){
    const redis_key = req.path;
    console.log("masuk cache : ", redis_key);
    clientLocal.get(redis_key, (err, data) => {
        if(err) throw err;
        if(data !== null) {
            console.log("Success Redis GET: ", redis_key)
            const response = JSON.parse(data || '{}');
            res.status(200)
            res.json(response)
        }
        else{
            next()
        }
    })
}

const redisService = {
    get,
    set,
    cache
}

export default redisService