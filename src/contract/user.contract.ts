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

export {
    people,
    peopleGet, 
    peopleReg, 
    peopleUpdate
}