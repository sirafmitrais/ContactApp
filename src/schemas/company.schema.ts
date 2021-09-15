import { mongoose } from "../common/database/mongoose.database";
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        company_name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        field: {
            type: String
        },
        status: {
            type: String
        },
        image_path: {
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
    CompanyModel,
    companySchema
}