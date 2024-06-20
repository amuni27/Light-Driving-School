import {QuizRequestDto} from "../../dto/QuizRequestDto";
import {QuizResponseDto} from "../../dto/QuizResponseDto";
import {QuizService} from "../QuizService";

import {Error} from "mongoose";
import Quiz from "../../model/Quiz";
import {MappingService} from "../../utils/transform";
import {LessonServiceImpl} from "./LessonServiceImpl";
import {LessonService} from "../LessonService";
import Lesson from "../../model/Lesson";


export class QuizServiceImpl implements QuizService {

    private mappingService;
    private lessonService: LessonService;

    constructor() {
        this.mappingService = new MappingService(QuizResponseDto)
        this.lessonService = new LessonServiceImpl();
    }

    async addQuiz(quizRequestDto: QuizRequestDto): Promise<QuizResponseDto> {
        try {
            const quiz = new Quiz(quizRequestDto);
            const savedQuiz = await quiz.save();
            if (!savedQuiz) {
                throw new Error("Can't save lesson");
            }

            const result = await this.lessonService.addQuizTOLesson(savedQuiz._id, quizRequestDto.lessonId);
            if (!result) {
                throw new Error("Could not add quiz to lesson");
            }

            const moduleResult = await savedQuiz.populate("addedBy")
            return this.mappingService.transformToDTO(moduleResult)
        } catch (error) {
            throw error;
        }
    }

    async updateQuiz(id: string, quizRequestDto: QuizRequestDto): Promise<string> {
        try {
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                throw new Error(`Quiz with id ${id} not found`);
            }

            const result = await Quiz.updateOne({_id: id}, quizRequestDto);
            if (!result) {
                throw new Error(`Failed to update Quiz with id ${id}`);
            }

            if (result.modifiedCount === 0) {
                throw new Error(`No fields were updated for quiz with id ${id}`);
            }

            return "lesson updated successfully";
        } catch (error) {
            throw error;
        }
    }

    async deleteQuiz(quizId: string): Promise<boolean> {
        try {
            const foundedQuiz = await Quiz.findById(quizId);
            if (!foundedQuiz) {
                throw new Error(`Quiz with id ${quizId} not found`);
            }
            const result = await this.lessonService.deleteQuizFromLesson(foundedQuiz.lessonId)
            if (!result) {
                throw new Error(`Failed to delete quiz with id ${foundedQuiz.lessonId}`);
            }
            const quiz = await Quiz.deleteOne({_id: quizId});
            if (quiz.deletedCount > 0) return true;
            else throw new Error(`Quiz with id ${quizId} not found and cannot be deleted`);
        } catch (error) {
            throw error;
        }
    }

    async findQuiz(id: string): Promise<QuizResponseDto> {
        try {
            const quiz = await Quiz.findById(id).populate('addedBy');
            if (!quiz) {
                throw new Error(`Quiz with id ${id} not found`);
            }

            return this.mappingService.transformToDTO(quiz);
        } catch (error) {
            throw error;
        }
    }

    async findAllQuiz(): Promise<QuizResponseDto[]> {
        try {
            const quiz = await Quiz.find().populate('addedBy');
            if (!quiz) {
                throw new Error("Lesson not found");
            }
            return quiz.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw error;
        }
    }

    addQuestionTOQuiz(quizId: string, lessonId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteQuestionFromQuiz(quizId: string, lessonId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}