import {MappingService} from "../../utils/transform";
import {LessonResponseDto} from "../../dto/LessonResponseDto";
import {LessonRequestDto} from "../../dto/LessonRequestDto";
import Lesson from "../../model/Lesson";
import mongoose, {Error} from "mongoose";
import {ModuleServiceImpl} from "./ModuleServiceImpl";
import {ModuleService} from "../ModuleService";
import {LessonService} from "../LessonService";
import Module from "../../model/Modules";

export class LessonServiceImpl implements LessonService {
    private mappingService;
    private moduleService: ModuleService;


    constructor() {
        this.mappingService = new MappingService(LessonResponseDto);
        this.moduleService = new ModuleServiceImpl();
    }

    async addLesson(lessonRequestDto: LessonRequestDto): Promise<LessonResponseDto> {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const lesson = new Lesson(lessonRequestDto);
            const savedLesson = await lesson.save();
            if (!savedLesson) {
                throw new Error("Can't save lesson");
            }
            const result = await this.moduleService.addLessonTOModule(lessonRequestDto.moduleId, savedLesson._id, savedLesson.lessonNumber);
            if (!result) {
                throw new Error("Could not add lesson to course");
            }

            const moduleResult = await savedLesson.populate("addedBy")
            await session.commitTransaction();
            await session.endSession();
            return this.mappingService.transformToDTO(moduleResult)
        } catch (error) {
            throw error;
        }
    }

    async updateLesson(id: string, lessonRequestDto: LessonRequestDto): Promise<string> {
        try {
            const lesson = await Lesson.findById(id);
            if (!lesson) {
                throw new Error(`lesson with id ${id} not found`);
            }

            const result = await Lesson.updateOne({_id: id}, lessonRequestDto);
            if (!result) {
                throw new Error(`Failed to update lesson with id ${id}`);
            }

            if (result.modifiedCount === 0) {
                throw new Error(`No fields were updated for lesson with id ${id}`);
            }

            return "lesson updated successfully";
        } catch (error) {
            throw error;
        }
    }

    async deleteLesson(lessonId: string): Promise<boolean> {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const foundedLesson = await Lesson.findById(lessonId);
            if (!foundedLesson) {
                throw new Error(`Lesson with id ${lessonId} not found`);
            }
            const result = await this.moduleService.deleteModuleToCourse(lessonId, foundedLesson.moduleId)
            if (!result) {
                throw new Error(`Failed to delete lesson with id ${lessonId}`);
            }
            const module = await Lesson.deleteOne({_id: lessonId});
            await session.commitTransaction();
            await session.endSession();
            if (module.deletedCount > 0) return true;
            else throw new Error(`Module with id ${lessonId} not found and cannot be deleted`);
        } catch (error) {
            throw error;
        }
    }

    async findLesson(id: string): Promise<LessonResponseDto> {
        try {
            const lesson = await Lesson.findById(id).populate('addedBy');
            if (!lesson) {
                throw new Error(`Lesson with id ${id} not found`);
            }

            return this.mappingService.transformToDTO(lesson);
        } catch (error) {
            throw error;
        }
    }

    async findAllLesson(): Promise<LessonResponseDto[]> {
        try {
            const lesson = await Lesson.find().populate('addedBy');
            if (!lesson) {
                throw new Error("Lesson not found");
            }
            return lesson.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw error;
        }

    }

    async addContentTOLesson(lessonId: string, contentId: string, contentNumber: number): Promise<boolean> {
        try {
            const lesson = await Lesson.findById(lessonId);
            if (!lesson) {
                throw new Error("Cant not found Lesson with id ${lessonId}`);");
            }

            const updatedLesson = await Lesson.updateOne(
                {_id: lessonId},
                {$push: {contents: {_id: contentId, number: contentNumber}}}
            );
            if (!updatedLesson.acknowledged) {
                throw new Error(`Cannot add content to Module with id ${contentId}`);
            }
            return true;
        } catch (error) {
            console.error('Error adding content to Lesson:', error);
            throw new Error('Error adding content to lesson:' + error); // Update failed
        }
    }

    async deleteContentFromLesson(contentId: string, lessonId: string): Promise<boolean> {
        try {
            const module = await Module.findByIdAndUpdate(
                lessonId,
                {$pull: {contents: {_id: contentId}}},
                {new: true}
            );
            return true;
        } catch (error) {
            console.error('Error deleting content from Lesson:', error);
            throw new Error('Error deleting content from Lesson:' + error);
        }
    }
}