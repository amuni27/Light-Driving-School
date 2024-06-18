import mongoose, {Schema} from "mongoose";
import {Role} from '../constant/Constant'
import validator from "validator";

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                return validator.isEmail(value);
            },
            message: 'Invalid email format'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                return validator.isMobilePhone(value);
            },
            message: 'Invalid phone format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (value: string) {
                return validator.isStrongPassword(value);
            },
            message: 'Invalid password, use alphanumeric characters and special characters'
        }

    },
    role: {type: String, Role: Role, default: 'STUDENT'},

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    coursesEnrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    progress: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Progress'
        }
    ],
}, {timestamps: true});

const Users = mongoose.model('User', UserSchema);

export default Users;