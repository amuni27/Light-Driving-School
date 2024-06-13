import {UserType} from "../type/UserType";
import {UserRequestDTO} from "../dto/UserRequestDTO";
import {UserResponseDTO} from "../dto/UserResponseDTO";

export interface UserService {
    addUser(userRequestDTO: UserRequestDTO): Promise<UserResponseDTO>;

    deleteUser(id: string): Promise<boolean>;

    editUser(): Promise<UserResponseDTO>;

    findUser(id: string): Promise<UserResponseDTO>;

    findAllUser(): Promise<UserResponseDTO[]>;

}