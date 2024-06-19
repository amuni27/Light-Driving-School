import {ContentType} from "../constant/Constant";
import {Schema} from "mongoose";
import {type} from "node:os";
import content from "../model/Content";
import {IsNotEmpty} from "class-validator";

export class ContentRequestDto {
    @IsNotEmpty()
    private _type: ContentType;
    @IsNotEmpty()
    private _content: Schema.Types.Mixed;
    @IsNotEmpty()
    private _addedBy: string;
    @IsNotEmpty()
    private _contentNumber: number;
    @IsNotEmpty()
    private _lessonId: string;


    constructor(type: ContentType, content: Schema.Types.Mixed, addedBy: string, contentNumber: number, lessonId: string) {

        this._type = type;
        this._content = content;
        this._addedBy = addedBy;
        this._contentNumber = contentNumber;
        this._lessonId = lessonId;
    }




    get type(): ContentType {
        return this._type;
    }

    set type(value: ContentType) {
        this._type = value;
    }

    get content(): Schema.Types.Mixed {
        return this._content;
    }

    set content(value: Schema.Types.Mixed) {
        this._content = value;
    }

    get addedBy(): string {
        return this._addedBy;
    }

    set addedBy(value: string) {
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