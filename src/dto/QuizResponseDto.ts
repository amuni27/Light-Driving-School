import {Schema} from "mongoose";
import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";

export class QuizResponseDto {
    @Expose({name: "id"})
    private _id: string = '';
    @Expose({name: "title"})
    private _title: string = '';
    @Expose({name: "description"})
    private _description: string = '';
    @Expose({name: "lessonId"})
    private _lessonId: string = '';
    @Expose({name: "question"})
    private _question: string = '';
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();


    get lessonId(): string {
        return this._lessonId;
    }

    set lessonId(value: string) {
        this._lessonId = value;
    }

    get question(): string {
        return this._question;
    }

    set question(value: string) {
        this._question = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
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

    get lesson(): string {
        return this._lessonId;
    }

    set lesson(value: string) {
        this._lessonId = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
    }
}