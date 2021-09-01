

type listHewan = {
    hewan: string[]
}


type error = string[]

async function listIndex(): Promise<{listHewan: listHewan, error?: error|null }>{
    let data: listHewan = {
        hewan : ['sapi', 'ayam', 'kambing', 'kalkun']
    }
    let err = null;
    return {
        listHewan:data,
        error: err
    }
}

export {
    listIndex
}