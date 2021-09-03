function checkMongoErrorCode(err: any): (string | any) {
    if(err.code==11000){
        return "You Were Registering using Username or Email or Identity Number or Account Number That Already Registered on System"
    }
    else{
        return err
    }
}

export {
    checkMongoErrorCode
}