import {CourseService} from "../CourseService";
import {CourseRequestDto} from "../../dto/CourseRequestDto";
import {CourseResponseDto} from "../../dto/CourseResponseDto";
import Course from "../../model/Course";
import {MappingService} from "../../utils/transform";
import {Error} from "mongoose";


export class CourseServiceImpl implements CourseService {
    private mappingService;

    constructor() {
        this.mappingService = new MappingService(CourseResponseDto)
    }

    async addCourse(courseRequestDto: CourseRequestDto): Promise<CourseResponseDto> {
        try {
            const course = new Course(courseRequestDto);
            const savedCourse = await course.save()
            const result = await savedCourse.populate("addedBy")
            console.log(result)
            return this.mappingService.transformToDTO(result)
        } catch (error) {
            throw error;
        }

    }

    async updateCourse(id: string, courseRequestDto: CourseRequestDto): Promise<boolean> {
        try {
            const course = await Course.findById(id);
            if (!course) {
                throw new Error(`Course with id ${id} not found`);
            }

            const result = await Course.updateOne({_id: id}, courseRequestDto);
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

    async deleteCourse(courseId: string): Promise<boolean> {
        try {
            console.log(courseId);
            const course = await Course.deleteOne({_id: courseId});
            if (course.deletedCount === 0) return true;
            else throw new Error(`Course with id ${courseId} not found`);

        } catch (error) {
            throw error;
        }
    }

    async findCourse(id: string): Promise<CourseResponseDto> {
        try {
            const course = await Course.findById(id).populate('addedBy');
            if (!course) {
                throw new Error(`Course with id ${id} not found`);
            }

            return this.mappingService.transformToDTO(course);
        } catch (error) {
            throw error;
        }

    }

    async findAllCourse(): Promise<CourseResponseDto[]> {
        try {
            const course = await Course.find().populate('addedBy');
            if (!course) {
                throw new Error("Courses not found");
            }
            return course.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw error;
        }
    }
}