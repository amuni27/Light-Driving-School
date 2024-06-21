import {ContentRequestDto} from "../../dto/ContentRequestDto";
import {ContentResponseDto} from "../../dto/ContentResponseDto";

import {MappingService} from "../../utils/transform";
import {ContentConstant} from "../../constant/Constant";
import {ImageQuestion} from "../../model/Image";
import {AudioQuestion} from "../../model/Audio";
import {VideoQuestion} from "../../model/VIdeo";
import {TextQuestion} from "../../model/Text";
import mongoose, {Error} from "mongoose";
import {QuestionService} from "../QuestionService";
import {QuestionRequestDto} from "../../dto/QuestionRequestDto";
import {QuestionResponseDto} from "../../dto/QuestionResponseDto";
import {QuizService} from "../QuizService";
import {QuizServiceImpl} from "./QuizServiceImpl";
import Questions from "../../model/Questions";
import Question from "../../model/Questions";
import {QuestionError} from "../../exceptions/QuestionError";

export class QuestionServiceImpl implements QuestionService {

    mappingService;
    quizService: QuizService;

    constructor() {
        this.mappingService = new MappingService(QuestionResponseDto)
        this.quizService = new QuizServiceImpl();
    }

    async addQuestion(questionRequestDto: QuestionRequestDto): Promise<QuestionResponseDto> {
        try {
            const question = this.createContent(questionRequestDto);

            if (!question) {
                throw new QuestionError(`Unsupported question type: ${questionRequestDto.type}`);
            }

            const addContentToLesson = await this.quizService.addQuestionTOQuiz(questionRequestDto.quizId, question._id.toString(), questionRequestDto.questionNumber)
            if (!addContentToLesson) {
                throw new QuestionError(`Cannot add content to lesson: ${questionRequestDto.quizId}`);
            }
            const savedQuestion = await question.save();
            if (!savedQuestion) {
                throw new QuestionError("Could not save content");
            }

            return this.mappingService.transformToDTO(savedQuestion.populate("addedBy"));
        } catch (error) {
            console.error(`Error in addContent: ${error}`);
            throw new QuestionError(`Error in add question: ${error}`);
        }
    }


    updateQuestion(questionId: string, questionRequestDto: QuestionRequestDto): Promise<QuestionResponseDto> {
        throw new Error("Method not implemented.");
    }

    async deleteQuestion(questionId: string): Promise<boolean> {
        try {
            const foundedQuestion = await Question.findById(questionId);
            if (!foundedQuestion) {
                throw new QuestionError(`Question with id ${questionId} not found`);
            }
            const result = await this.quizService.deleteQuestionFromQuiz(questionId, foundedQuestion.quizId)
            if (!result) {
                throw new QuestionError(`Failed to delete Quiz with id ${foundedQuestion.quizId}`);
            }
            const question = await Questions.deleteOne({_id: questionId});

            if (question.deletedCount > 0) return true;
            else throw new QuestionError(`Question with id ${questionId} not found and cannot be deleted`);
        } catch (error) {
            throw new QuestionError(`Error in delete question: ${error}`);        }
    }

    async findQuestion(questionId: string): Promise<QuestionResponseDto> {
        try {
            const question = await Questions.findById(questionId).populate('addedBy');
            if (!question) {
                throw new QuestionError(`Content with id ${questionId} not found`);
            }
            return this.mappingService.transformToDTO(question);
        } catch (error) {
            throw new QuestionError(`Error in find question: ${error}`);        }
    }

    async findAllQuestion(): Promise<QuestionResponseDto[]> {
        try {
            const question = await Questions.find().populate('addedBy');
            if (!question) {
                throw new QuestionError("Question not found");
            }
            return question.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw new QuestionError(`Error in find question: ${error}`);        }
    }

    private createContent(questionRequestDto: QuestionRequestDto): InstanceType<typeof Questions> | null {
        switch (questionRequestDto.type) {
            case ContentConstant.IMAGE:
                return new ImageQuestion(questionRequestDto);
            case ContentConstant.AUDIO:
                return new AudioQuestion(questionRequestDto);
            case ContentConstant.VIDEO:
                return new VideoQuestion(questionRequestDto);
            case ContentConstant.TEXT:
                return new TextQuestion(questionRequestDto);
            default:
                return null;
        }
    }

}