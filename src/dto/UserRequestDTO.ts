import {Role} from "../constant/Constant";
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword} from "class-validator";



export class UserRequestDTO {
    @IsNotEmpty()
    private _username: string;
    @IsNotEmpty()
    @IsEmail()
    private _email: string;
    @IsNotEmpty()
    @IsPhoneNumber()
    private _phoneNumber: string;
    @IsNotEmpty()
    @IsStrongPassword()
    private _password: string;
    @IsNotEmpty()
    private _role: Role;
    @IsNotEmpty()
    private _firstName: string;
    @IsNotEmpty()
    private _lastName: string;

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    constructor(username: string, password: string, email: string, phoneNumber: string, role: Role, firstName: string, lastName: string) {
        this._username = username;
        this._password = password;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._role = role;
        this._firstName = firstName;
        this._lastName = lastName;
    }


    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

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

    toString(): string {
        return `UserRequestDTO {
            username: ${this.username},
            password: ${this.password},
            email: ${this.email},
            phoneNumber: ${this.phoneNumber},
            role: ${this.role},
            firstName: ${this.firstName},
            lastName: ${this.lastName}
        }`;
    }
}

