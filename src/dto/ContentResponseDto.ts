import {ContentType} from "../constant/Constant";
import {Schema} from "mongoose";
import {Expose} from "class-transformer";

export class ContentResponseDto {
    @Expose({name: 'id'})
    private _id: string = '';
    @Expose({name: 'id'})
    private _type: ContentType = ContentType.TEXT;
    @Expose({name: 'id'})
    private _content: Schema.Types.Mixed | undefined;
    @Expose({name: 'id'})
    private _addedBy: string = '';
    @Expose({name: 'id'})
    private _contentNumber: number = 0;
    @Expose({name: 'id'})
    private _lessonId: string = ''


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get type(): ContentType {
        return this._type;
    }

    set type(value: ContentType) {
        this._type = value;
    }

    get content(): Schema.Types.Mixed | undefined {
        return this._content;
    }

    set content(value: Schema.Types.Mixed | undefined) {
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