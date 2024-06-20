import {ContentConstant} from "../constant/Constant";
import {Schema} from "mongoose";
import {type} from "node:os";
import content from "../model/Content";
import {IsNotEmpty} from "class-validator";
import {ContentType} from "../types/ContentType";

export class QuestionRequestDto {
    @IsNotEmpty()
    private _type: ContentConstant;
    @IsNotEmpty()
    private _title: string;
    private _url: string;
    @IsNotEmpty()
    private _description: string;
    @IsNotEmpty()
    private _addedBy: string;
    @IsNotEmpty()
    private _questionNumber: number;
    @IsNotEmpty()
    private _quizId: string;


    constructor(type: ContentConstant, title: string, url: string, description: string, addedBy: string, questionNumber: number, quizId: string) {
        this._type = type;
        this._title = title;
        this._url = url;
        this._description = description;
        this._addedBy = addedBy;
        this._questionNumber = questionNumber;
        this._quizId = quizId;
    }


    get type(): ContentConstant {
        return this._type;
    }

    set type(value: ContentConstant) {
        this._type = value;
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

    get addedBy(): string {
        return this._addedBy;
    }

    set addedBy(value: string) {
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
}