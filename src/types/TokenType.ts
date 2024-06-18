import {ObjectId} from "mongoose";
import {Role} from "../constant/Constant";

export interface TokenType {
    userid: string
    username: string,
    role: Role
}