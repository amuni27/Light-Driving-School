import {IsNotEmpty} from "class-validator";

export class ModulesRequestDto {
    @IsNotEmpty()
    private _title: string;
    private _lessons: string[];
    private _description: string;


    constructor(title: string, lessons: string[], description: string) {
        this._title = title;
        this._lessons = lessons;
        this._description = description;
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