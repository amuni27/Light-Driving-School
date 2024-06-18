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
exports.UserResponseDTO = void 0;
const Constant_1 = require("../constant/Constant");
const class_transformer_1 = require("class-transformer");
class UserResponseDTO {
    constructor() {
        this._id = '';
        this._username = '';
        this._email = '';
        this._phoneNumber = '';
        this._role = Constant_1.Role.STUDENT;
        this._firstName = '';
        this._lastName = '';
        this._token = '';
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
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
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
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
    get token() {
        return this._token;
    }
    set token(value) {
        this._token = value;
    }
}
exports.UserResponseDTO = UserResponseDTO;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'username' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "_username", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'email' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "_email", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'phoneNumber' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "_phoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'role' }),
    __metadata("design:type", Number)
], UserResponseDTO.prototype, "_role", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'firstName' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "_firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'lastName' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "_lastName", void 0);
