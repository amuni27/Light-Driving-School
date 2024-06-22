import {UserResponseDTO} from "../../dto/UserResponseDTO";
import  'express';
import {ContentController} from "../../controller/ContentController";

declare global {
    namespace Express {
        interface Request {
            user?: UserResponseDTO;
            authController: MockAuthController
            authorization:MockAuthorization
            contentController: ContentController
            users: { id: "user123" },
        }
    }
}