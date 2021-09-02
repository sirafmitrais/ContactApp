import { mongoose } from "../common/database/mongoose.database";
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        company_name: {
            type: String,
            required: true,
        },
        title: {
            type: String
        },
        start_from: {
            type: Number,
        },
        until: {
            type: Number,
        }, 
        description: {
            type: String
        },
        status: {
            type: String
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

const CompanyModel = mongoose.model('company', companySchema)

export {
    CompanyModel
}