import { mongoose } from "../common/database/mongoose.database";
import * as bcrypt from 'bcrypt'
const Schema = mongoose.Schema;

enum level {
    Godfather = "Godfather",
    Veteran = "Veteran",
    HeadHunter = "HeadHunter",
    Partisan = "Partisan",
    Noob = "Noob"
}

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
        },
        level: {
            type: level
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

// userSchema.methods.verifyPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

const UserModel = mongoose.model('user', userSchema)

export {
    UserModel,
    level
}