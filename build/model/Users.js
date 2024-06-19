"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Constant_1 = require("../constant/Constant");
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
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
            validator: function (value) {
                return validator_1.default.isEmail(value);
            },
            message: 'Invalid email format'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator_1.default.isMobilePhone(value);
            },
            message: 'Invalid phone format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (value) {
                return validator_1.default.isStrongPassword(value);
            },
            message: 'Invalid password, use alphanumeric characters and special characters'
        }
    },
    role: { type: String, Role: Constant_1.Role, default: 'STUDENT' },
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    progress: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Progress'
        }
    ],
});
const Users = mongoose_1.default.model('User', UserSchema);
exports.default = Users;