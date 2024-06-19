import {LessonRequestDto} from "../dto/LessonRequestDto";
import {LessonResponseDto} from "../dto/LessonResponseDto";

export interface LessonService {

    addLesson(lessonRequestDto: LessonRequestDto): Promise<LessonResponseDto>;

    updateLesson(id: string, lessonRequestDto: LessonRequestDto): Promise<string>;

    deleteLesson(lessonId: string): Promise<boolean>;

    findLesson(id: string): Promise<LessonResponseDto>;

    findAllLesson(): Promise<LessonResponseDto[]>;


}