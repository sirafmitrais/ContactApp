import { mongoose } from "../common/database/mongoose.database";
const Schema = mongoose.Schema;

const contactbookSchema = new Schema(
    {
        id_contact_book: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        id_contact: {
            type: Schema.Types.ObjectId,
            required: true
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

const ContactBookModel = mongoose.model('contactbook', contactbookSchema)

export {
    ContactBookModel
}