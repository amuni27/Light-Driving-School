import {UserService} from "../UserService";
import {UserRequestDTO} from "../../dto/UserRequestDTO";
import {UserResponseDTO} from "../../dto/UserResponseDTO";
import Users from "../../model/Users";
import {Error} from "mongoose";
import {MappingService} from "../../utils/transform";
import {sign} from "jsonwebtoken";
import bcrypt = require("bcrypt");
import {UserType} from "../../types/UserType";
import {ProgressService} from "../ProgressService";
import {ProgressServiceImpl} from "./ProgressServiceImpl";
import {UserError} from "../../exceptions/UserError";


export class UserServiceImpl implements UserService {

    private mappingService;

    constructor() {
        this.mappingService = new MappingService(UserResponseDTO);

    }

    async addUser(userRequestDTO: UserRequestDTO): Promise<UserResponseDTO> {

        // Encrypt the password
        userRequestDTO.password = await bcrypt.hash(userRequestDTO.password, 10);

        // Save user in the database
        try {
            const user = new Users(userRequestDTO);
            const savedUser = await user.save();
            const userResponse: UserResponseDTO = this.mappingService.transformToDTO(savedUser);

            // Generate token for user
            userResponse.token = sign({
                userid: savedUser._id,
                username: savedUser.username,
                role: savedUser.role
            }, process.env.JWT_SECRET || "driving@latest", {expiresIn: '1h'});
            return userResponse;
        } catch (error) {
            throw new UserError(`Error in add user: ${error}`);
        }
    }


    async deleteUser(id: string): Promise<boolean> {
        const result = await Users.deleteOne({_id: id});
        if (result.deletedCount > 0) return true;
        else throw new UserError("No users found.");

    }


    async updateUser(id: string, userRequestDTO: UserRequestDTO): Promise<boolean> {
        const exitedUser = await Users.findById(id);

        if (!exitedUser) {
            throw new UserError(`User with id ${id} not found`);
        }
        const result = await Users.updateOne({_id: id}, userRequestDTO)

        if (!result) {
            throw new UserError(`Failed to update user with id ${id}`);
        }
        if (result.modifiedCount === 0) {
            throw new UserError(`No fields were updated for user with id ${id}`);
        }

        return true;
    }

    async findUser(id: string): Promise<UserResponseDTO> {
        const result = await Users.findById(id)
        if (!result) {
            throw new UserError('User not found');
        }
        return this.mappingService.transformToDTO(result);
    }

    async findAllUser(): Promise<UserResponseDTO[]> {
        const result = await Users.find() || [];
        return result.map(user => this.mappingService.transformToDTO(user));
    }


    async login(userRequestDTO: UserRequestDTO): Promise<UserResponseDTO> {
        const fetchedUser: UserType | null = await Users.findOne({username: userRequestDTO.username});
        if (!fetchedUser) {
            throw new UserError('Invalid username or password');
        }

        const passwordMatch = await bcrypt.compare(userRequestDTO.password, fetchedUser.password);
        if (!passwordMatch) {
            throw new UserError('Invalid username or password');
        }

        const userResponse: UserResponseDTO = this.mappingService.transformToDTO(fetchedUser);
        userResponse.token = sign({
            userid: fetchedUser._id,
            username: fetchedUser.username,
            role: fetchedUser.role
        }, process.env.JWT_SECRET || "driving@latest", {expiresIn: '1h'});

        return userResponse;
    }

}