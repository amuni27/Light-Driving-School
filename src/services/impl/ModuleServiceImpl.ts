import {ModuleService} from "../ModuleService";
import {ModulesRequestDto} from "../../dto/ModulesRequestDto";
import {ModulesResponseDto} from "../../dto/ModulesResponseDto";
import Course from "../../model/Course";
import {MappingService} from "../../utils/transform";
import mongoose, {Error} from "mongoose";
import Modules from "../../model/Modules";
import {CourseService} from "../CourseService";
import {CourseServiceImpl} from "./CourseServiceImpl";
import Module from "../../model/Modules";
import {ModulesError} from "../../exceptions/ModulesError";

export class ModuleServiceImpl implements ModuleService {

    private mappingService;
    private courseService: CourseService;

    constructor() {
        this.mappingService = new MappingService(ModulesResponseDto);
        this.courseService = new CourseServiceImpl();
    }


    async addModules(modulesRequestDto: ModulesRequestDto): Promise<ModulesResponseDto> {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const module = new Modules(modulesRequestDto);
            const savedModule = await module.save()
            if (!savedModule) {
                throw new ModulesError("Can't save module");
            }
            console.log(savedModule)
            const result = await this.courseService.addModuleToCourse(modulesRequestDto.courseId, savedModule._id, savedModule.moduleNumber);
            if (!result) {
                throw new ModulesError("Could not add module to course");
            }

            const moduleResult = await savedModule.populate("addedBy")
            await session.commitTransaction();
            await session.endSession();
            return this.mappingService.transformToDTO(moduleResult)
        } catch (error) {
            throw new ModulesError(`Error in add module: ${error}`);
        }
    }

    async updateModules(id: string, modulesRequestDto: ModulesRequestDto): Promise<boolean> {
        try {
            const modules = await Modules.findById(id);
            if (!modules) {
                throw new ModulesError(`Module with id ${id} not found`);
            }

            const result = await Modules.updateOne({_id: id}, modulesRequestDto);
            if (!result) {
                throw new ModulesError(`Failed to update user with id ${id}`);
            }

            if (result.modifiedCount === 0) {
                throw new ModulesError(`No fields were updated for user with id ${id}`);
            }

            return true;
        } catch (error) {
            throw new ModulesError(`Error in update module: ${error}`);
        }
    }

    async deleteModules(moduleId: string): Promise<boolean> {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const foundedModule = await Module.findById(moduleId);
            if (!foundedModule) {
                throw new ModulesError(`Module with id ${moduleId} not found`);
            }
            const result = await this.courseService.deleteModuleToCourse(moduleId, foundedModule.courseId)
            if (!result) {
                throw new ModulesError(`Failed to delete user with id ${moduleId}`);
            }
            const module = await Modules.deleteOne({_id: moduleId});
            await session.commitTransaction();
            await session.endSession();
            if (module.deletedCount > 0) return true;
            else throw new ModulesError(`Module with id ${moduleId} not found and cannot be deleted`);
        } catch (error) {
            throw new ModulesError(`Error in delete module: ${error}`);
        }
    }

    async findModules(id: string): Promise<ModulesResponseDto> {
        try {
            const module = await Modules.findById(id).populate('addedBy');
            if (!module) {
                throw new ModulesError(`Module with id ${id} not found`);
            }

            return this.mappingService.transformToDTO(module);
        } catch (error) {
            throw new ModulesError(`Error in find module: ${error}`);
        }

    }

    async findAllModules(): Promise<ModulesResponseDto[]> {
        try {
            const modules = await Modules.find().populate('addedBy');
            if (!modules) {
                throw new ModulesError("Module not found");
            }
            return modules.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw new ModulesError(`Error in find all module: ${error}`);
        }
    }

    async addLessonTOModule(moduleId: string, lessonId: string, lessonNumber: number): Promise<boolean> {
        try {
            const module = await Module.findById(moduleId);
            if (!module) {
                throw new ModulesError("Cant not found module with id ${moduleId}`);");
            }

            const updatedModule = await Module.updateOne(
                {_id: moduleId},
                {$push: {lessons: {_id: lessonId, number: lessonNumber}}}
            );
            if (!updatedModule.acknowledged) {
                throw new ModulesError(`Cannot add lesson to Module with id ${moduleId}`);
            }
            return true;
        } catch (error) {
            console.error('Error adding module to course:', error);
            throw new ModulesError('Error adding module to course:' + error); // Update failed
        }
    }

    async deleteModuleToCourse(lessonId: string, moduleId: string): Promise<boolean> {
        try {
            const module = await Module.findByIdAndUpdate(
                moduleId,
                {$pull: {lessons: {_id: lessonId}}},
                {new: true}
            );
            return true;
        } catch (error) {
            console.error('Error deleting module to course:', error);
            throw new ModulesError('Error deleting module to course:' + error);
        }
    }
}