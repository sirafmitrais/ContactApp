import { mongoose } from "../common/database/mongoose.database";
import * as bcrypt from 'bcrypt'
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        user_name: {
            type: String,
            required: true,
            unique: true
        },
        account_number: {
            type: String,
            required: true,
            unique: true
        },
        email_address: {
            type: String,
            required: true,
            unique: true
        },
        identity_number: {
            type: String,
            required: true,
            unique: true
        }, 
        password: {
            type: String,
            required: true,
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

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

// userSchema.methods.verifyPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

const UserModel = mongoose.model('user', userSchema)

export {
    UserModel
}