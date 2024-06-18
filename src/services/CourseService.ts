import Course from "../model/Course";
import {CourseRequestDto} from "../dto/CourseRequestDto";
import {CourseResponseDto} from "../dto/CourseResponseDto";
import {UserResponseDTO} from "../dto/UserResponseDTO";

export interface CourseService {

    addCourse(courseRequestDto: CourseRequestDto): Promise<CourseResponseDto>;

    updateCourse(id: string, courseRequestDto: CourseRequestDto): Promise<boolean>;

    deleteCourse(courseId: string): Promise<boolean>;

    findCourse(id: string): Promise<CourseResponseDto>;

    findAllCourse(): Promise<CourseResponseDto[]>;
}