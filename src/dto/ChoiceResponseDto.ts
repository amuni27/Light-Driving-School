import {ContentConstant} from "../constant/Constant";
import {Schema} from "mongoose";
import {Expose, Type} from "class-transformer";
import {UserResponseDTO} from "./UserResponseDTO";
import {ChoiceType} from "../types/ChoiceType";

export class ChoiceContentResponseDto {
    @Expose({name: 'text'})
    private _text: string = '';
    @Expose({name: 'imageUrl'})
    private _imageUrl: string = '';
    @Expose({name: 'videoUrl'})
    private _videoUrl: string = '';
    @Expose({name: 'description'})
    private _description: string = '';

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get videoUrl(): string {
        return this._videoUrl;
    }

    set videoUrl(value: string) {
        this._videoUrl = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}

export class ChoiceResponseDto {
    @Expose({name: 'id'})
    private _id: string = '';
    @Expose({name: 'type'})
    private _type: ContentConstant = ContentConstant.TEXT;
    @Expose({name: 'choiceLetter'})
    private _choiceLetter: string = '';
    @Expose({name: 'content'})
    @Type(() => ChoiceContentResponseDto)
    private _content: ChoiceContentResponseDto = new ChoiceContentResponseDto();

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

    get choiceLetter(): string {
        return this._choiceLetter;
    }

    set choiceLetter(value: string) {
        this._choiceLetter = value;
    }

    get content(): ChoiceContentResponseDto {
        return this._content;
    }

    set content(value: ChoiceContentResponseDto) {
        this._content = value;
    }
}

