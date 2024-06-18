import {PipelineStage, Schema} from "mongoose";
import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";
import {Role} from "../constant/Constant";
import {UserType} from "../types/UserType";


export class CourseResponseDto {

    @Expose({name:'id'})
    private _id: string='';
    @Expose({name: "title"})
    private _title: string = '';
    @Expose({name: 'description'})
    private _description: string = '';
    @Expose({name: 'module'})
    private _module: string[] = [];
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();
    @Expose({name: 'createdAt'})
    private _createdAt: Date = new Date();
    @Expose({name: 'updatedAt'})
    private _updatedAt: Date = new Date();


    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
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