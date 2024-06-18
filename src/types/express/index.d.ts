import {UserResponseDTO} from "../../dto/UserResponseDTO";
import  'express';

declare global {
    namespace Express {
        interface Request {
            user?: UserResponseDTO;
        }
    }
}