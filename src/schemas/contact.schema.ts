import { mongoose } from "../common/database/mongoose.database";

import { educationSchema, companySchema } from ".";

const Schema = mongoose.Schema;
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        company: {
            type: [companySchema],
        },
        education: {
            type: [educationSchema],
        }, 
        phone_number: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        tags: {
            type: [String]
        }
    },
    {
        timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const ContactModel = mongoose.model('contact', contactSchema)

export {
    ContactModel,
    contactSchema
}