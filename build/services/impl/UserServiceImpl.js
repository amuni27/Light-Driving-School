"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceImpl = void 0;
const UserResponseDTO_1 = require("../../dto/UserResponseDTO");
const Users_1 = __importDefault(require("../../model/Users"));
const mongoose_1 = require("mongoose");
const transform_1 = require("../../utils/transform");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class UserServiceImpl {
    constructor() {
        this.mappingService = new transform_1.MappingService(UserResponseDTO_1.UserResponseDTO);
    }
    addUser(userRequestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            // Encrypt the password
            userRequestDTO.password = yield bcrypt.hash(userRequestDTO.password, 10);
            // Save user in the database
            try {
                const user = new Users_1.default(userRequestDTO);
                const savedUser = yield user.save();
                const userResponse = this.mappingService.transformToDTO(savedUser);
                // Generate token for user
                userResponse.token = (0, jsonwebtoken_1.sign)({
                    userid: savedUser._id,
                    username: savedUser.username,
                    role: savedUser.role
                }, process.env.JWT_SECRET || "driving@latest", { expiresIn: '1h' });
                return userResponse;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Users_1.default.deleteOne({ _id: id });
            if (result.deletedCount > 0)
                return true;
            else
                throw new mongoose_1.Error("No users found.");
        });
    }
    updateUser(id, userRequestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitedUser = yield Users_1.default.findById(id);
            if (!exitedUser) {
                throw new mongoose_1.Error(`User with id ${id} not found`);
            }
            const result = yield Users_1.default.updateOne({ _id: id }, userRequestDTO);
            if (!result) {
                throw new mongoose_1.Error(`Failed to update user with id ${id}`);
            }
            if (result.modifiedCount === 0) {
                throw new mongoose_1.Error(`No fields were updated for user with id ${id}`);
            }
            return true;
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Users_1.default.findById(id);
            if (!result) {
                throw new mongoose_1.Error('User not found');
            }
            return this.mappingService.transformToDTO(result);
        });
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield Users_1.default.find()) || [];
            return result.map(user => this.mappingService.transformToDTO(user));
        });
    }
    login(userRequestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchedUser = yield Users_1.default.findOne({ username: userRequestDTO.username });
            if (!fetchedUser) {
                throw new mongoose_1.Error('Invalid username or password');
            }
            const passwordMatch = yield bcrypt.compare(userRequestDTO.password, fetchedUser.password);
            if (!passwordMatch) {
                throw new mongoose_1.Error('Invalid username or password');
            }
            const userResponse = this.mappingService.transformToDTO(fetchedUser);
            userResponse.token = (0, jsonwebtoken_1.sign)({
                userid: fetchedUser._id,
                username: fetchedUser.username,
                role: fetchedUser.role
            }, process.env.JWT_SECRET || "driving@latest", { expiresIn: '1h' });
            return userResponse;
        });
    }
}
exports.UserServiceImpl = UserServiceImpl;
