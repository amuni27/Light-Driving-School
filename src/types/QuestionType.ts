import {Schema} from "mongoose";
import {ContentType} from "./ContentType";
import {UserResponseDTO} from "../dto/UserResponseDTO";

export interface QuestionType {
    quizId: string,
    options: [{
        _id: string,
        choiceLetter: string,
    }], // Array of options for the question
    correctAnswerIndex: number,
    questionNumber: number,
    addedBy: UserResponseDTO
}

export interface QuestionImageType extends QuestionType{
    url: string,
    description: string,
}
export interface QuestionAudioType extends QuestionType{
    url: string,
    description: string,
}
export interface QuestionVideoType extends QuestionType{
    url: string,
    description: string,
}
export interface QuestionTextType extends QuestionType{
    description:string
}