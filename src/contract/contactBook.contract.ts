import { contactCompleteRes } from ".";

interface contactBookSchema {
    id_contact_book: string,
    id_contact: string
}

interface contactBookCompleteRes extends contactBookSchema{
    _id: string
}

interface contactBookList {
    userCreator: {
        id: string,
        name: string
    },
    contactList: contactCompleteRes[]
}

export {
    contactBookSchema,
    contactBookCompleteRes,
    contactBookList
}