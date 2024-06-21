import mongoose from "mongoose";
import {Status} from "../../constant/Constant";

export interface QuestionProgress  {
    questionId: string;
    answer: string;
    isCorrect: boolean;
    numberOfAttempts: number;
}

export interface QuizProgress  {
    quizId: string;
    // completedQuestions: QuestionProgress[];
    // score: number;
    status: Status;
}

export interface ContentProgress  {
    contentId: string | unknown;
    status: Status;
}

export interface LessonProgress  {
    lessonId: string|unknown;
    contents: ContentProgress[];
    status: Status;
    quizProgress?: QuizProgress;
}

export interface ModuleProgress  {
    moduleId?: string|unknown;
    lessons: LessonProgress[];
    status: Status;
}

export interface FinalTestProgress {
    testId: string;
    completedQuestions: QuestionProgress[];
    score: number;
    status: Status;
}

export interface IProgress {
    studentId: string;
    courseId: string;
    modules: ModuleProgress[];
    finalTestProgress?: FinalTestProgress;
}