import {Schema} from "mongoose";
import {IsNotEmpty} from "class-validator";
import lesson from "../model/Lesson";

export class QuizRequestDto {
    @IsNotEmpty()
    private _title: string;
    @IsNotEmpty()
    private _description: string;
    @IsNotEmpty()
    private _lessonId: string;


    constructor(title: string, description: string, lesson: string) {
        this._title = title;
        this._description = description;
        this._lessonId = lesson;
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

    get lessonId(): string {
        return this._lessonId;
    }

    set lessonId(value: string) {
        this._lessonId = value;
    }
}