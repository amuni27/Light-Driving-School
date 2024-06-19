import {ModulesRequestDto} from "../dto/ModulesRequestDto";
import {ModulesResponseDto} from "../dto/ModulesResponseDto";

export interface ModuleService {

    addModules(modulesRequestDto: ModulesRequestDto): Promise<ModulesResponseDto>;

    updateModules(id: string, modulesRequestDto: ModulesRequestDto): Promise<boolean>;

    deleteModules(moduleId: string): Promise<boolean>;

    findModules(id: string): Promise<ModulesResponseDto>;

    findAllModules(): Promise<ModulesResponseDto[]>;

    addLessonTOModule(moduleId: string, lessonId: string| unknown, lessonNumber: number| unknown): Promise<boolean>;

    deleteModuleToCourse(lessonId: string , moduleId: string| unknown): Promise<boolean>;
}