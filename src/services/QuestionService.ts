import {ContentRequestDto} from "../dto/ContentRequestDto";
import {ContentResponseDto} from "../dto/ContentResponseDto";
import {QuestionRequestDto} from "../dto/QuestionRequestDto";
import {QuestionResponseDto} from "../dto/QuestionResponseDto";

export interface QuestionService {

    addQuestion(questionRequestDto: QuestionRequestDto): Promise<QuestionResponseDto>;

    updateQuestion(questionId: string, questionRequestDto: QuestionRequestDto): Promise<QuestionResponseDto>;

    deleteQuestion(questionId: string): Promise<boolean>;

    findQuestion(questionId: string): Promise<QuestionResponseDto>;

    findAllQuestion(): Promise<QuestionResponseDto[]>;
}