interface companyBaseSchema {
    company_name: string,
    title?: string,
    start_from?: number,
    until?: number,
    description?: string,
    status?: string
}

interface companyCreateReq {
    company_name: string,
    description: string,
    field: string,
    status: string,
    image_path?: string
}

interface companyCompleteRes extends companyCreateReq {
    id: string
}

export {
    companyBaseSchema,
    companyCreateReq,
    companyCompleteRes
}