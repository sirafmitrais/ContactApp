import { mongoose } from "../common/database/mongoose.database";
const Schema = mongoose.Schema;

const educationSchema = new Schema(
    {
        institution_name: {
            type: String,
            required: true,
        },
        major: {
            type: String,
        },
        enrolled_year: {
            type: Number,
        },
        graduation_year: {
            type: Number,
        }, 
    },
    {
        timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const EducationModel = mongoose.model('education', educationSchema)

export {
    EducationModel
}