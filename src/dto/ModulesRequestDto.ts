import {IsNotEmpty} from "class-validator";

export class ModulesRequestDto {
    @IsNotEmpty()
    private _title: string;
    private _lessons: string[];
    @IsNotEmpty()
    private _description: string;
    @IsNotEmpty()
    private _courseId: string;
    @IsNotEmpty()
    private _moduleNumber: number;


    get moduleNumber(): number {
        return this._moduleNumber;
    }

    set moduleNumber(value: number) {
        this._moduleNumber = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get courseId(): string {
        return this._courseId;
    }

    set courseId(value: string) {
        this._courseId = value;
    }

    constructor(title: string, lessons: string[], description: string, courseId: string, moduleNumber: number) {
        this._title = title;
        this._lessons = lessons;
        this._description = description;
        this._courseId = courseId;
        this._moduleNumber = moduleNumber;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get lessons(): string[] {
        return this._lessons;
    }

    set lessons(value: string[]) {
        this._lessons = value;
    }
}