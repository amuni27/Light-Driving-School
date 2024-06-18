"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestDTO = void 0;
const Constant_1 = require("../constant/Constant");
const class_validator_1 = require("class-validator");
class UserRequestDTO {
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    constructor(username, password, email, phoneNumber, role, firstName, lastName) {
        this._username = username;
        this._password = password;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._role = role;
        this._firstName = firstName;
        this._lastName = lastName;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get role() {
        return this._role;
    }
    set role(value) {
        this._role = value;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    toString() {
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
exports.UserRequestDTO = UserRequestDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRequestDTO.prototype, "_username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserRequestDTO.prototype, "_email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UserRequestDTO.prototype, "_phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)(),
    __metadata("design:type", String)
], UserRequestDTO.prototype, "_password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UserRequestDTO.prototype, "_role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRequestDTO.prototype, "_firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRequestDTO.prototype, "_lastName", void 0);
