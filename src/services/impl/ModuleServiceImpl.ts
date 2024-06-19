import {ModuleService} from "../ModuleService";
import {ModulesRequestDto} from "../../dto/ModulesRequestDto";
import {ModulesResponseDto} from "../../dto/ModulesResponseDto";
import Course from "../../model/Course";
import {MappingService} from "../../utils/transform";
import {Error} from "mongoose";
import Modules from "../../model/Modules";
import {CourseService} from "../CourseService";
import {CourseServiceImpl} from "./CourseServiceImpl";
import Module from "../../model/Modules";

export class ModuleServiceImpl implements ModuleService {

    private mappingService;
    private courseService: CourseService;

    constructor() {
        this.mappingService = new MappingService(ModulesResponseDto);
        this.courseService = new CourseServiceImpl();
    }


    async addModules(modulesRequestDto: ModulesRequestDto): Promise<ModulesResponseDto> {
        try {
            const module = new Modules(modulesRequestDto);
            const savedModule = await module.save()
            if (!savedModule) {
                throw new Error("Can't save module");
            }
            console.log(savedModule)
            const result = await this.courseService.addModuleToCourse(modulesRequestDto.courseId, savedModule._id, savedModule.moduleNumber);
            if (!result) {
                throw new Error("Could not add module to course");
            }

            const moduleResult = await savedModule.populate("addedBy")
            return this.mappingService.transformToDTO(moduleResult)
        } catch (error) {
            throw error;
        }
    }

    async updateModules(id: string, modulesRequestDto: ModulesRequestDto): Promise<boolean> {
        try {
            const modules = await Modules.findById(id);
            if (!modules) {
                throw new Error(`Module with id ${id} not found`);
            }

            const result = await Modules.updateOne({_id: id}, modulesRequestDto);
            if (!result) {
                throw new Error(`Failed to update user with id ${id}`);
            }

            if (result.modifiedCount === 0) {
                throw new Error(`No fields were updated for user with id ${id}`);
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteModules(moduleId: string): Promise<boolean> {
        try {
            const foundedModule = await Module.findById(moduleId);
            if (!foundedModule) {
                 throw new Error(`Module with id ${moduleId} not found`);
            }
            const result = await this.courseService.deleteModuleToCourse(moduleId, foundedModule.courseId)
            if(!result){
                throw new Error(`Failed to delete user with id ${moduleId}`);
            }
            const module = await Modules.deleteOne({_id: moduleId});
            if (module.deletedCount > 0) return true;
            else throw new Error(`Module with id ${moduleId} not found and cannot be deleted`);
        } catch (error) {
            throw error;
        }
    }

    async findModules(id: string): Promise<ModulesResponseDto> {
        try {
            const module = await Modules.findById(id).populate('addedBy');
            if (!module) {
                throw new Error(`Module with id ${id} not found`);
            }

            return this.mappingService.transformToDTO(module);
        } catch (error) {
            throw error;
        }

    }

    async findAllModules(): Promise<ModulesResponseDto[]> {
        try {
            const modules = await Modules.find().populate('addedBy');
            if (!modules) {
                throw new Error("Module not found");
            }
            return modules.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw error;
        }
    }
}