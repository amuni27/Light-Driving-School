import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";
import {CourseModulesType} from "../types/CourseType";



export class CourseResponseDto {

    @Expose({name: 'id'})
    private _id: string = '';
       @Expose({name: "title"})
    private _title: string = '';
    @Expose({name: 'description'})
    private _description: string = '';
    @Expose({name: 'modules'})
    @Type(() => CourseModulesType)
    private _module: CourseModulesType[] = [];
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();
    @Expose({name: 'createdAt'})
    private _createdAt: Date = new Date();
    @Expose({name: 'updatedAt'})
    private _updatedAt: Date = new Date();

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
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

    get module(): CourseModulesType[] {
        return this._module;
    }

    set module(value: CourseModulesType[]) {
        this._module = value;
    }
}