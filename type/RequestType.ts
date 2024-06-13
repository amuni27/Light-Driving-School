import {UserType} from "./UserType";


export interface RequestType {
    headers: {
        Authorization: string;
        [key: string]: string;
    };
}