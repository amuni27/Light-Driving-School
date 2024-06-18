import {CourseRequestDto} from "../dto/CourseRequestDto";
import {CourseResponseDto} from "../dto/CourseResponseDto";
import {ModulesRequestDto} from "../dto/ModulesRequestDto";
import {ModulesResponseDto} from "../dto/ModulesResponseDto";

export interface ModuleService {

    addModules(modulesRequestDto: ModulesRequestDto): Promise<ModulesResponseDto>;

    updateModules(id: string, modulesRequestDto: ModulesRequestDto): Promise<boolean>;

    deleteModules(moduleId: string): Promise<boolean>;

    findModules(id: string): Promise<ModulesResponseDto>;

    findAllModules(): Promise<ModulesResponseDto[]>;
}