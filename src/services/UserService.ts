import {UserRequestDTO} from "../dto/UserRequestDTO";
import {UserResponseDTO} from "../dto/UserResponseDTO";

export interface UserService {
    addUser(userRequestDTO: UserRequestDTO): Promise<UserResponseDTO>;

    deleteUser(id: string): Promise<boolean>;

    updateUser(id: string, userRequestDTO: UserRequestDTO): Promise<boolean>;

    findUser(id: string): Promise<UserResponseDTO>;

    findAllUser(): Promise<UserResponseDTO[]>;

    login(userRequestDTO: UserRequestDTO): Promise<UserResponseDTO>;

}