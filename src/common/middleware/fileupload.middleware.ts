import multer from 'multer'
import fs from 'fs'
import express from "express"
import mongoose from 'mongoose'


export const fileStorage = (
    fileDirectory: string,
    action?: string,
    model?: mongoose.Model<any>,
    field?: string
) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync(fileDirectory, { recursive: true})
            cb(null, fileDirectory)
        }, 
        filename: (req, file, cb) => {
            if (action === "UPDATE" && file){
                model?.findById(req.params.id).then((data) => {
                    if(data[field!!]){
                        try{
                            fs.unlinkSync(data[field!!])
                        }
                        catch(e){}
                    }
                })
            }
            const filename = 
                new Date().toISOString().replace(/:/g, "-")+"-"+file.originalname
            cb(null, filename)
        }
    })
}

export const upload = (
    fileDirectory: string,
    type: string,
    action?: string,
    model?: mongoose.Model<any>,
    field?: string
) => {
    return multer({
        dest: "upload",
        storage: fileStorage(fileDirectory, action, model, field),
        fileFilter(
            req: express.Request,
            file: Express.Multer.File,
            callback: multer.FileFilterCallback
        ){
            if (file.mimetype === type) {
                callback(null, true)
            } else {
                callback(new Error(`Only ${type} file supported`))
            }
        },
        limits: { fileSize: 10000000},
    })
}
