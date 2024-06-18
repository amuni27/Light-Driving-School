import {ModuleService} from "../ModuleService";
import {ModulesRequestDto} from "../../dto/ModulesRequestDto";
import {ModulesResponseDto} from "../../dto/ModulesResponseDto";
import Course from "../../model/Course";
import {MappingService} from "../../utils/transform";
import {Error} from "mongoose";
import Modules from "../../model/Modules";

export class ModuleServiceImpl implements ModuleService {

    private mappingService;

    constructor() {
        this.mappingService = new MappingService(ModulesResponseDto);
    }

    async addModules(modulesRequestDto: ModulesRequestDto): Promise<ModulesResponseDto> {
        try {
            const module = new Course(modulesRequestDto);
            const savedModule = await module.save()
            const result = await savedModule.populate("addedBy")
            console.log(result)
            return this.mappingService.transformToDTO(result)
        } catch (error) {
            throw error;
        }
    }

    async updateModules(id: string, modulesRequestDto: ModulesRequestDto): Promise<boolean> {
        try {
            const modules = await Modules.findById(id);
            if (!modules) {
                throw new Error(`Course with id ${id} not found`);
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
            const course = await Modules.deleteOne({_id: moduleId});
            if (course.deletedCount === 0) return true;
            else throw new Error(`Course with id ${moduleId} not found`);
        } catch (error) {
            throw error;
        }
    }

    async findModules(id: string): Promise<ModulesResponseDto> {
        try {
            const module = await Modules.findById(id).populate('addedBy');
            if (!module) {
                throw new Error(`Course with id ${id} not found`);
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
                throw new Error("Courses not found");
            }
            return modules.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw error;
        }
    }
}