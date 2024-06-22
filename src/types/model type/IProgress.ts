import mongoose from "mongoose";
import { Status } from "../../constant/Constant";

// Base Progress Interface
export interface BaseProgress {
    kind: string;
    status: Status;
}

// Question Progress Interface
export interface QuestionProgress extends BaseProgress {
    questionId: string;
    quizId:string;
    score: number;
    numberOfAttempts: number;
}

// Quiz Progress Interface
export interface QuizProgress extends BaseProgress {
    kind: 'QuizProgress';
    quizId: string;
    // completedQuestions: QuestionProgress[];
    score: number;
}

// Content Progress Interface
export interface ContentProgress extends BaseProgress {
    kind: 'ContentProgress';
    contentId: string | unknown;
}

// Lesson Progress Interface
export interface LessonProgress extends BaseProgress {
    kind: 'LessonProgress';
    lessonId: string | unknown;
    // contents: ContentProgress[];
    quizProgress?: QuizProgress;
}

// Module Progress Interface
export interface ModuleProgress extends BaseProgress {
    kind: 'ModuleProgress';
    moduleId?: string | unknown;
    // lessons: LessonProgress[];
}

// Final Test Progress Interface
export interface FinalTestProgress {
    testId: string;
    completedQuestions: QuestionProgress[];
    score: number;
    status: Status;
}

// IProgress Interface with Modules as a Union Type
export interface IProgress {
    studentId: string;
    courseId: string;
    courseContent: (ModuleProgress | LessonProgress | ContentProgress | QuizProgress | QuestionProgress)[];
    finalTestProgress?: FinalTestProgress;
}
