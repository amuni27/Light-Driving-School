import {IsNotEmpty} from "class-validator";
import {PipelineStage} from "mongoose";


export class CourseRequestDto {
    @IsNotEmpty()
    private _title: string;
    @IsNotEmpty()
    private _description: string;
    private _module: string[];
    private _addedBy: string;


    get addedBy(): string {
        return this._addedBy;
    }

    set addedBy(value: string) {
        this._addedBy = value;
    }

    constructor(title: string, description: string, module: string[], userId: string, addedBy: string) {
        this._title = title;
        this._description = description;
        this._module = module;
        this._addedBy = addedBy;
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

    get module(): string[] {
        return this._module;
    }

    set module(value: string[]) {
        this._module = value;
    }
}