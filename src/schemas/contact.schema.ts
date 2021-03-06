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
            type: [
                {
                   company_name: {
                       type: String
                   },
                   title: {
                       type: String
                   },
                   start_from: {
                       type: Number
                   } ,
                   until: {
                       type: Number
                   },
                   description: {
                       type: String
                   },
                   status: {
                       type: String
                   }
                }
            ],
        },
        education: {
            type: [
                {
                   institution_name: {
                       type: String
                   },
                   major: {
                       type: String
                   },
                   enrolled_year: {
                       type: Number
                   } ,
                   graduation_year: {
                       type: Number
                   },
                }
            ]
        },
        address:{
            type: String,
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