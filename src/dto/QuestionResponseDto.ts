import {ContentConstant} from "../constant/Constant";
import {Schema} from "mongoose";
import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";
import {ChoiceType} from "../types/ChoiceType";
import {ChoiceResponseDto} from "./ChoiceResponseDto";

export class QuestionResponseDto {
    @Expose({name: 'id'})
    private _id: string = '';
    @Expose({name: 'type'})
    private _type: ContentConstant = ContentConstant.TEXT;
    @Expose({name: 'question'})
    private _questions: Schema.Types.Mixed | undefined;
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();
    @Expose({name: 'options'})
    @Type(() => ChoiceResponseDto)
    private _options: ChoiceResponseDto = new ChoiceResponseDto();
    @Expose({name: 'questionNumber'})
    private _questionNumber: number = 0;
    @Expose({name: 'lessonId'})
    private _quizId: string = ''
    @Expose({name: 'title'})
    private _title: string = ''
    @Expose({name: 'url'})
    private _url: string = ''
    @Expose({name: 'description'})
    private _description: string = ''


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get type(): ContentConstant {
        return this._type;
    }

    set type(value: ContentConstant) {
        this._type = value;
    }

    get question(): Schema.Types.Mixed | undefined {
        return this._questions;
    }

    set question(value: Schema.Types.Mixed | undefined) {
        this._questions = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
    }

    get questionNumber(): number {
        return this._questionNumber;
    }

    set questionNumber(value: number) {
        this._questionNumber = value;
    }

    get quizId(): string {
        return this._quizId;
    }

    set quizId(value: string) {
        this._quizId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}