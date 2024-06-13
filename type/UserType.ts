import {Role} from "../constant/Role";


export interface UserType {
    username: string,
    email: string,
    password: string,
    role: Role,
    profile: {
        firstName: String,
        lastName: String,

    }
}