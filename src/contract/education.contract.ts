interface educationBaseSchema {
    institution_name: string,
    major: string,
    enrolled_year?: number,
    graduation_year?: number
}

interface educationCompleteRes extends educationBaseSchema{
    id: string
}

export {
    educationBaseSchema,
    educationCompleteRes
}