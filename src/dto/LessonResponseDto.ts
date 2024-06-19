import {IsNotEmpty} from "class-validator";
import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";

export class LessonResponseDto {
    @Expose({name: "id"})
    private _id: string = '';
    @Expose({name: "title"})
    private _title: string = '';
    @Expose({name: "description"})
    private _description: string = '';
    @Expose({name: "lessonNumber"})
    private _lessonNumber: string = '';
    @Expose({name: "quiz"})
    private _quiz: string = '';
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();
    @Expose({name: 'moduleId'})
    private _moduleId: string = '';


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
    }

    get moduleId(): string {
        return this._moduleId;
    }

    set moduleId(value: string) {
        this._moduleId = value;
    }

    get lessonNumber(): string {
        return this._lessonNumber;
    }

    set lessonNumber(value: string) {
        this._lessonNumber = value;
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