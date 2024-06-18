import {Role} from "../constant/Constant";
import {ObjectId} from "mongoose";


export interface UserType {
    _id: ObjectId
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: Role,
    firstName: String,
    lastName: String,
}