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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UserServiceImpl_1 = require("../services/impl/UserServiceImpl");
class AuthController {
    constructor() {
        this.authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                console.log('Authorization header is missing');
                return res.status(401).json({ error: 'Authorization header required' });
            }
            const token = authHeader.split(' ')[1]; // Extract token from header
            if (!token) {
                console.log('Token is missing or not formatted correctly');
                res.status(401).json({ error: 'Authentication token missing or invalid' });
            }
            try {
                if (!process.env.JWT_SECRET) {
                    throw new Error('JWT_SECRET environment variable not set');
                }
                const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
                // Example: Assuming userService.findUser returns a UserResponseDTO
                const user = yield this.userService.findUser(decodedToken.userid);
                if (!user) {
                    console.log('User not found for the provided token');
                    res.status(401).json({ error: 'Invalid token' });
                }
                req.user = user;
                next();
            }
            catch (error) {
                console.error('Token verification failed:', error);
                res.status(401).json({ error: 'Invalid token | Expired Token' });
            }
        });
        this.userService = new UserServiceImpl_1.UserServiceImpl();
    }
}
exports.AuthController = AuthController;
