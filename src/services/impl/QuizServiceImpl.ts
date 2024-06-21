import {QuizRequestDto} from "../../dto/QuizRequestDto";
import {QuizResponseDto} from "../../dto/QuizResponseDto";
import {QuizService} from "../QuizService";

import {Error} from "mongoose";
import Quiz from "../../model/Quiz";
import {MappingService} from "../../utils/transform";
import {LessonServiceImpl} from "./LessonServiceImpl";
import {LessonService} from "../LessonService";
import Lesson from "../../model/Lesson";
import {QuizError} from "../../exceptions/QuizError";


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
                throw new QuizError("Can't save lesson");
            }

            const result = await this.lessonService.addQuizTOLesson(savedQuiz._id, quizRequestDto.lessonId);
            if (!result) {
                throw new QuizError("Could not add quiz to lesson");
            }

            const moduleResult = await savedQuiz.populate("addedBy")
            return this.mappingService.transformToDTO(moduleResult)
        } catch (error) {
            throw new QuizError(`Error in add quiz: ${error}`);            }
    }

    async updateQuiz(id: string, quizRequestDto: QuizRequestDto): Promise<string> {
        try {
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                throw new QuizError(`Quiz with id ${id} not found`);
            }

            const result = await Quiz.updateOne({_id: id}, quizRequestDto);
            if (!result) {
                throw new QuizError(`Failed to update Quiz with id ${id}`);
            }

            if (result.modifiedCount === 0) {
                throw new QuizError(`No fields were updated for quiz with id ${id}`);
            }

            return "lesson updated successfully";
        } catch (error) {
            throw new QuizError(`Error in update quiz: ${error}`);
        }
    }

    async deleteQuiz(quizId: string): Promise<boolean> {
        try {
            const foundedQuiz = await Quiz.findById(quizId);
            if (!foundedQuiz) {
                throw new QuizError(`Quiz with id ${quizId} not found`);
            }
            const result = await this.lessonService.deleteQuizFromLesson(foundedQuiz.lessonId)
            if (!result) {
                throw new QuizError(`Failed to delete quiz with id ${foundedQuiz.lessonId}`);
            }
            const quiz = await Quiz.deleteOne({_id: quizId});
            if (quiz.deletedCount > 0) return true;
            else throw new QuizError(`Quiz with id ${quizId} not found and cannot be deleted`);
        } catch (error) {
            throw new QuizError(`Error in delete quiz: ${error}`);
        }
    }

    async findQuiz(id: string): Promise<QuizResponseDto> {
        try {
            const quiz = await Quiz.findById(id).populate('addedBy');
            if (!quiz) {
                throw new QuizError(`Quiz with id ${id} not found`);
            }

            return this.mappingService.transformToDTO(quiz);
        } catch (error) {
            throw new QuizError(`Error in find quiz: ${error}`);
        }
    }

    async findAllQuiz(): Promise<QuizResponseDto[]> {
        try {
            const quiz = await Quiz.find().populate('addedBy');
            if (!quiz) {
                throw new QuizError("Lesson not found");
            }
            return quiz.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw new QuizError(`Error in find quiz: ${error}`);
        }
    }

    async addQuestionTOQuiz(quizId: string, questionID: string, questionNumber: number): Promise<boolean> {
        try {
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                throw new QuizError("Cant not found Quiz with id ${lessonId}`);");
            }

            const updatedLesson = await Quiz.updateOne(
                {_id: quizId},
                {$push: {questions: {_id: questionID, number: questionNumber}}}
            );
            if (!updatedLesson.acknowledged) {
                throw new QuizError(`Cannot add content to Lesson with id ${questionID}`);
            }
            return true;
        } catch (error) {
            console.error('Error adding content to Lesson:', error);
            throw new QuizError('Error adding content to lesson:' + error); // Update failed
        }
    }

    async deleteQuestionFromQuiz(questionId: string, quizId: string): Promise<boolean> {
        try {
            const lesson = await Quiz.findByIdAndUpdate(
                quizId,
                {$pull: {questions: {_id: questionId}}},
                {new: true}
            );
            return true;
        } catch (error) {
            console.error('Error deleting content from Lesson:', error);
            throw new QuizError('Error deleting content from Lesson:' + error);
        }
    }
}