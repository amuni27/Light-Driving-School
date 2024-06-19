import {UserResponseDTO} from "./UserResponseDTO";
import {Expose, Type} from "class-transformer";
import {CourseResponseDto} from "./CourseResponseDto";

export class ModulesResponseDto {
    @Expose({name: "id"})
    private _id: string='';
    @Expose({name: 'title'})
    private _title: string = ''
    @Expose({name: 'lessons'})
    private _lessons: string = ''
    @Expose({name: 'description'})
    private _description: string = '';
    @Expose({name: 'moduleNumber'})
    private _moduleNumber: number = 0;
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();
    @Expose({name: 'courseId'})
    private _courseId: string = '';

    get courseId(): string {
        return this._courseId;
    }

    set courseId(value: string) {
        this._courseId = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get moduleNumber(): number {
        return this._moduleNumber;
    }

    set moduleNumber(value: number) {
        this._moduleNumber = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get lessons(): string {
        return this._lessons;
    }

    set lessons(value: string) {
        this._lessons = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
    }
}