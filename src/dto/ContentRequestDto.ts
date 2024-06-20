import {ContentConstant} from "../constant/Constant";
import {Schema} from "mongoose";
import {type} from "node:os";
import content from "../model/Content";
import {IsNotEmpty} from "class-validator";
import {ContentType} from "../types/ContentType";

export class ContentRequestDto {
    @IsNotEmpty()
    private _type: ContentConstant;
    @IsNotEmpty()
    private _title: string;

    private _url: string;
    @IsNotEmpty()
    private _description: string;
    @IsNotEmpty()
    private _addedBy: string;
    @IsNotEmpty()
    private _contentNumber: number;
    @IsNotEmpty()
    private _lessonId: string;


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




    constructor(type: ContentConstant, title: string, url: string, description: string, addedBy: string, contentNumber: number, lessonId: string) {

        this._type = type;
        this._title = title;
        this._url = url;
        this._description = description;
        this._addedBy = addedBy;
        this._contentNumber = contentNumber;
        this._lessonId = lessonId;
    }


    get type(): ContentConstant {
        return this._type;
    }

    set type(value: ContentConstant) {
        this._type = value;
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