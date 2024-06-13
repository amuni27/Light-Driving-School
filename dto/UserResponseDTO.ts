import {Role} from "../constant/Role";
import {Expose} from "class-transformer";
import {ObjectId} from "mongoose";

export class UserResponseDTO {

    @Expose({name: 'username'})
    private _username: string='';
    @Expose({name: 'email'})
    private _email: string='';
    @Expose({name: 'phoneNumber'})
    private _phoneNumber: string='';
    @Expose({name: 'role'})
    private _role: Role=Role.STUDENT;
    @Expose({name: 'firstName'})
    private _firstName: string='';
    @Expose({name: 'lastName'})
    private _lastName: string='';
    private _token: string='';


    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get role(): Role {
        return this._role;
    }

    set role(value: Role) {
        this._role = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }
}

