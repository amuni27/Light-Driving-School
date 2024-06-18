import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import {UserService} from "../services/UserService";
import {UserServiceImpl} from "../services/impl/UserServiceImpl";
import {TokenType} from "../types/TokenType";
import {UserResponseDTO} from "../dto/UserResponseDTO";


export class AuthController {
    private userService: UserService;

    constructor() {

        this.userService = new UserServiceImpl();
    }

    authenticate = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader =  req.headers['authorization'];
        if (!authHeader) {
            console.log('Authorization header is missing');
            return res.status(401).json({error: 'Authorization header required'});
        }

        const token = authHeader.split(' ')[1]; // Extract token from header

        if (!token) {
            console.log('Token is missing or not formatted correctly');
            res.status(401).json({error: 'Authentication token missing or invalid'});
        }

        try {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET environment variable not set');
            }

            const decodedToken = verify(token, process.env.JWT_SECRET) as TokenType;

            // Example: Assuming userService.findUser returns a UserResponseDTO
            const user: UserResponseDTO | null = await this.userService.findUser(decodedToken.userid);

            if (!user) {
                console.log('User not found for the provided token');
                res.status(401).json({error: 'Invalid token'});
            }


            req.user = user;


            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({error: 'Invalid token | Expired Token'});
        }
    }
}