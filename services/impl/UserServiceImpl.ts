import {UserService} from "../UserService";
import {UserRequestDTO} from "../../dto/UserRequestDTO";
import {UserResponseDTO} from "../../dto/UserResponseDTO";
import Users from "../../model/Users";
import bcrypt = require("bcrypt");
import {Error} from "mongoose";
import {MappingService} from "../../utils/transform";
import jwt from "jsonwebtoken";


export class UserServiceImpl implements UserService {

    addUser(userRequestDTO: UserRequestDTO): Promise<UserResponseDTO> {
        return new Promise<UserResponseDTO>(async (resolve, reject) => {
            userRequestDTO.password = await bcrypt.hash(userRequestDTO.password, 10); // encrypt the password by bcrypt library
            // save use in database
            const user = new Users(userRequestDTO);
            user.save().then(savedUser => {

                //map Database response to UserResponseDto
                const mapperService = new MappingService(UserResponseDTO)
                const userResponse: UserResponseDTO = mapperService.transformToDTO(savedUser)

                //generate token for user
                userResponse.token = jwt.sign({
                    userid: savedUser._id,
                    username: savedUser.username,
                    role: savedUser.role
                }, process.env.JWT_SECRET || "driving@latest", {expiresIn: '1h'});
                resolve(userResponse);
            }).catch(err => {
                reject(err.errmsg)
            });
        })

    }

    deleteUser(id: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            Users.deleteOne({_id: id}).then((result) => {
                if (result.deletedCount > 0) resolve(true)
                reject({"error": new Error('No user found.')});
            }).catch(err => {
                reject({"error": err})
            })
        })
    }

    async editUser(): Promise<UserResponseDTO> {
        return new Promise<UserResponseDTO>((resolve, reject) => {
        })
    }

    async findUser(id: string): Promise<UserResponseDTO> {
        return new Promise<UserResponseDTO>((resolve, reject) => {
            Users.findById(id).then((result) => {
                if (result) {
                    const mapperService = new MappingService(UserResponseDTO)
                    const responseDto = mapperService.transformToDTO(result)
                    resolve(responseDto);
                }
                reject({"error": new Error('User not found')});
            }).catch(err => {
                reject({"error": err})
            })
        })
    }

    async findAllUser(): Promise<UserResponseDTO[]> {
        return new Promise<UserResponseDTO[]>((resolve, reject) => {
            Users.find().then((result) => {
                const responseDto: UserResponseDTO[] = [];
                if (result) {
                    const mapperService = new MappingService(UserResponseDTO)
                    result.map(user => {
                        responseDto.push(mapperService.transformToDTO(user));
                    })
                    resolve(responseDto);
                }
                reject({"error": new Error('User not found')});
            }).catch(err => {
                reject({"error": err})
            })
        })
    }
}