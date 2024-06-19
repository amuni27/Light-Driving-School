import {Schema} from "mongoose";
import {IsNotEmpty} from "class-validator";

export class LessonRequestDto {
    @IsNotEmpty()
    private _title: string;
    @IsNotEmpty()
    private _description: string;
    private _quiz: string;
    @IsNotEmpty()
    private _moduleId: string;
    @IsNotEmpty()
    private _lessonNumber: string;

    constructor(title: string, description: string, quiz: string, moduleId: string, lessonNumber: string) {
        this._title = title;
        this._description = description;
        this._quiz = quiz;
        this._moduleId = moduleId;
        this._lessonNumber = lessonNumber;
    }


    get lessonNumber(): string {
        return this._lessonNumber;
    }

    set lessonNumber(value: string) {
        this._lessonNumber = value;
    }

    get moduleId(): string {
        return this._moduleId;
    }

    set moduleId(value: string) {
        this._moduleId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get quiz(): string {
        return this._quiz;
    }

    set quiz(value: string) {
        this._quiz = value;
    }
}