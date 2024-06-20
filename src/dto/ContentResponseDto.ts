import {ContentConstant} from "../constant/Constant";
import {Schema} from "mongoose";
import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";

export class ContentResponseDto {
    @Expose({name: 'id'})
    private _id: string = '';
    @Expose({name: 'type'})
    private _type: ContentConstant = ContentConstant.TEXT;
    @Expose({name: 'id'})
    private _content: Schema.Types.Mixed | undefined;
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();
    @Expose({name: 'contentNumber'})
    private _contentNumber: number = 0;
    @Expose({name: 'lessonId'})
    private _lessonId: string = ''
    @Expose({name: 'title'})
    private _title: string = ''
    @Expose({name: 'url'})
    private _url: string = ''
    @Expose({name: 'description'})
    private _description: string = ''


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get type(): ContentConstant {
        return this._type;
    }

    set type(value: ContentConstant) {
        this._type = value;
    }

    get content(): Schema.Types.Mixed | undefined {
        return this._content;
    }

    set content(value: Schema.Types.Mixed | undefined) {
        this._content = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
    }

    get contentNumber(): number {
        return this._contentNumber;
    }

    set contentNumber(value: number) {
        this._contentNumber = value;
    }

    get lessonId(): string {
        return this._lessonId;
    }

    set lessonId(value: string) {
        this._lessonId = value;
    }
}