import {QuizRequestDto} from "../dto/QuizRequestDto";
import {QuizResponseDto} from "../dto/QuizResponseDto";


export interface QuizService {
    addQuiz(quizRequestDto: QuizRequestDto): Promise<QuizResponseDto>;

    updateQuiz(id: string, quizRequestDto: QuizRequestDto): Promise<string>;

    deleteQuiz(quizId: string): Promise<boolean>;

    findQuiz(id: string): Promise<QuizResponseDto>;

    findAllQuiz(): Promise<QuizResponseDto[]>;

    addQuestionTOQuiz(quizId: string, questionID: string, questionNumber: number): Promise<boolean>;

    deleteQuestionFromQuiz( questionId: string,quizId: string): Promise<boolean>;
}